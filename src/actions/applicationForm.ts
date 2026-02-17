'use server';

import db from '@/db';
import { ApplicationTable, PreviousEmployerTable } from '@/db/schema';
import { ApplicationFormPrevStateProps } from '@/types/types';
import { applicationFormSchema } from '@/types/validations';

export const handleApplicationForm = async (
  prevState: ApplicationFormPrevStateProps,
  formData: FormData,
): Promise<ApplicationFormPrevStateProps> => {
  try {
    const rawData = Object.fromEntries(formData);
    const result = applicationFormSchema.safeParse(rawData);

    if (!result.success) {
      const firstError = result.error.issues[0];
      return {
        status: 'error',
        message: firstError.message,
        field: firstError.path[0] as string,
      };
    }

    // 2. Database Transaction
    return await db.transaction(async (tx) => {
      const [newApp] = await tx
        .insert(ApplicationTable)
        .values({
          firstName: result.data.firstName,
          lastName: result.data.lastName,
          email: result.data.email,
          positionId: result.data.positionId,
          resumeUrl: result.data.resumeUrl,
          positionName: result.data.positionName,
        })
        .onConflictDoNothing({
          target: [ApplicationTable.email, ApplicationTable.positionId],
        })
        .returning({ id: ApplicationTable.id });

      if (!newApp) {
        return {
          status: 'error',
          message:
            'You have already submitted an application for this position.',
        };
      }

      await tx.insert(PreviousEmployerTable).values({
        applicationId: newApp.id,
        employerName: result.data.employerName,
        employerEmail: result.data.employerEmail,
        employerPhone: result.data.employerPhone,
        previousPosition: result.data.previousPosition,
        reasonForLeaving: result.data.reasonForLeaving,
        startDate: new Date(result.data.startDate),
        endDate: result.data.endDate ? new Date(result.data.endDate) : null,
      });

      return {
        status: 'success',
        message: `Application submitted successfully!`,
      };
    });
  } catch (error) {
    console.error('Submission error:', error);
    return {
      status: 'error',
      message: 'A technical error occurred. Please try again later.',
    };
  }
};
