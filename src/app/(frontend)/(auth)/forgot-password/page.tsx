'use client';

import { useSignIn, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { ClerkAPIError } from '@clerk/types';
import Bounded from '@/components/shared/Bounded';
import PageTitle from '@/components/shared/PageTitle';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PiEyeSlashThin, PiEyeThin } from 'react-icons/pi';

const ForgotPasswordPage = () => {
  const { signIn, isLoaded, setActive } = useSignIn();
  const { isSignedIn } = useUser();
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const [successfulCreation, setsuccessfulCreation] = useState<boolean>(false);
  const [errors, setErrors] = useState<ClerkAPIError[]>();

  useEffect(() => {
    if (isSignedIn) {
      router.push('/user');
    }
  }, [isSignedIn, router]);

  const handleCreate = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      await signIn?.create({
        strategy: 'reset_password_email_code',
        identifier: email,
      });

      setsuccessfulCreation(true);
    } catch (error: any) {
      if (isClerkAPIResponseError(error)) setErrors(error.errors);
      console.error(error, null, 2);
    }
  };

  const handleReset = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setErrors(undefined);

    if (!isLoaded) return;

    if (password !== confirmPassword) {
      setErrors([
        {
          longMessage: 'Password do not match',
          code: 'form_error_custom',
        } as any,
      ]);
    }

    try {
      const signInAttempt = await signIn.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      });

      setErrors(undefined);

      if (signInAttempt.status === 'complete') {
        await setActive({
          session: signInAttempt.createdSessionId,
        });
        router.push('/user');
      }
    } catch (error: any) {
      if (isClerkAPIResponseError(error)) setErrors(error.errors);
      console.error(error, null, 2);
    }
  };

  return (
    <Bounded isPadded>
      <PageTitle>Forget Password</PageTitle>

      <div className="grid md:grid-cols-2 gap-x-5">
        {successfulCreation ? (
          <form className="flex flex-col gap-y-5" onSubmit={handleReset}>
            <div className="space-y-1">
              <label htmlFor="sign-up-email-code" className="form-label">
                Code
              </label>
              <Input
                type="number"
                id="sign-up-email-code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                autoComplete=""
              />
            </div>

            <div className="space-y-1 col-span-full">
              <label htmlFor="sign-up-password" className="form-label">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  id="sign-up-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="password"
                  className="relative"
                  required
                />
                <Button
                  type="button"
                  variant="search"
                  className="absolute right-0 top-[50%] translate-y-[-50%] cursor-pointer"
                  onClick={() => setShowPassword((prevOpen) => !prevOpen)}
                >
                  <span>
                    {showPassword ? <PiEyeSlashThin /> : <PiEyeThin />}
                  </span>
                </Button>
              </div>
            </div>

            <div className="space-y-1 col-span-full">
              <label htmlFor="sign-up-confirm-password" className="form-label">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="sign-up-confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="password"
                  className="relative"
                  required
                />
                <Button
                  type="button"
                  variant="search"
                  className="absolute right-0 top-[50%] translate-y-[-50%] cursor-pointer"
                  onClick={() =>
                    setShowConfirmPassword((prevOpen) => !prevOpen)
                  }
                >
                  <span>
                    {showConfirmPassword ? <PiEyeSlashThin /> : <PiEyeThin />}
                  </span>
                </Button>
              </div>
            </div>

            <div id="clerk-captcha"></div>

            <Button type="submit" variant="submit">
              Reset
            </Button>
          </form>
        ) : (
          <form className="flex flex-col gap-y-3" onSubmit={handleCreate}>
            <div className="space-y-1">
              <label htmlFor="forget-email" className="form-label">
                Email
              </label>
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div id="clerk-captcha" />

            {errors && (
              <ul>
                {errors.map((e) => (
                  <li className="form-error-message" key={e.code}>
                    {e.longMessage}
                  </li>
                ))}
              </ul>
            )}

            <Button type="submit" variant="submit">
              Reset
            </Button>
          </form>
        )}

        <div className="hidden md:block">
          <Image
            src="/forget-password.jpg"
            alt="a woman walking in the crowd"
            width={600}
            height={800}
            priority
            className="min-w-full object-cover saturate-0"
          />
        </div>
      </div>
    </Bounded>
  );
};

export default ForgotPasswordPage;
