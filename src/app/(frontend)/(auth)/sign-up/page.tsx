'use client';

import { useState, useTransition } from 'react';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { ClerkAPIError, OAuthStrategy } from '@clerk/types';
import { useSignIn, useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import Bounded from '@/components/shared/Bounded';
import PageTitle from '@/components/shared/PageTitle';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { PiEyeSlashThin, PiEyeThin } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import clsx from 'clsx';
import Link from 'next/link';
import { BiLogoApple, BiLogoGithub, BiLogoGoogle } from 'react-icons/bi';
import SubmitButton from '@/components/shared/SubmitButton';

const SignUpPage = () => {
  const { signUp, isLoaded, setActive } = useSignUp();
  const { signIn, isLoaded: signInLoaded } = useSignIn();
  const router = useRouter();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [code, setCode] = useState<string>('');
  const [isPendingVerification, setIsPendingVerification] =
    useState<boolean>(false);
  const [error, setErrors] = useState<ClerkAPIError[]>();
  const [isCheckReadTerms, setIsCheckReadTerms] = useState<boolean>(false);

  const handleSignUp = async (e: React.SubmitEvent) => {
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
      await signUp.create({
        firstName,
        lastName,
        password,
        emailAddress: email,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      setIsPendingVerification(true);
    } catch (error: any) {
      if (isClerkAPIResponseError(error)) setErrors(error.errors);
      console.error(error, null, 2);
    }
  };

  const handleOAuth = async (strategy: OAuthStrategy) => {
    setErrors(undefined);

    if (!signInLoaded) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/user',
      });
    } catch (error: any) {
      if (isClerkAPIResponseError(error)) setErrors(error.errors);
      console.error(error, null, 2);
    }
  };

  const handleEmailCode = async (e: React.SubmitEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === 'complete') {
        await setActive({
          session: signUpAttempt.createdSessionId,
        });

        router.push('/user');
      } else {
        console.error('Sing Up attempt not complete', signUpAttempt);
        console.error('Sing Up attempt status', signUpAttempt.status);
      }
    } catch (error: any) {
      if (isClerkAPIResponseError(error)) setErrors(error.errors);

      console.error(error, null, 2);
    }
  };

  return (
    <Bounded isPadded>
      <PageTitle>Sign Up</PageTitle>
      <div className="grid md:grid-cols-2 md:gap-x-10">
        {isPendingVerification ? (
          <form className="flex flex-col gap-y-3" onSubmit={handleEmailCode}>
            <p>
              Please enter the code we just sent to email{' '}
              <span className="font-semibold">{email}</span>
            </p>
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

            <div
              id="clerk-captcha"
              data-cl-theme="dark"
              data-cl-size="flexible"
              className="col-span-full"
            />

            <SubmitButton>Complete Signing Up</SubmitButton>
          </form>
        ) : (
          <form
            className="grid grid-cols-2 gap-x-2 items-start"
            onSubmit={handleSignUp}
          >
            {/* oauth */}
            <div className="grid grid-cols-3 gap-x-4 col-span-full">
              <Button
                type="button"
                variant="oauth"
                onClick={() => handleOAuth('oauth_google')}
              >
                <BiLogoGoogle />
              </Button>

              <Button
                type="button"
                variant="oauth"
                onClick={() => handleOAuth('oauth_github')}
              >
                <BiLogoGithub />
              </Button>

              <Button
                type="button"
                variant="oauth"
                onClick={() => handleOAuth('oauth_apple')}
              >
                <BiLogoApple />
              </Button>

              <div
                id="clerk-captcha"
                data-cl-theme="dark"
                data-cl-size="flexible"
                className="col-span-full"
              />
            </div>

            <div className="flex col-span-full items-center">
              <div className="divider w-[30%]"></div>
              <p className="text-fs-300">Or sign in with</p>
              <div className="divider w-[30%]"></div>
            </div>

            <div className="space-y-1">
              <label htmlFor="sign-up-firstname" className="form-label">
                First Name
              </label>
              <Input
                type="text"
                id="sign-up-firstname"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                autoComplete="given-name"
                required
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="sign-up-lastname" className="form-label">
                Last Name
              </label>
              <Input
                type="text"
                id="sign-up-lastname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                autoComplete="family-name"
                required
              />
            </div>

            <div className="space-y-1 col-span-full">
              <label htmlFor="sign-up-email" className="form-label">
                Email
              </label>
              <Input
                type="email"
                id="sign-up-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>

            <div className="space-y-1 col-span-full">
              <label htmlFor="sign-up-password">Password</label>
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
              <label htmlFor="sign-up-confirm-password">Confirm Password</label>
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

            <div className="flex gap-x-2 items-center col-span-full">
              <Checkbox
                id="sign-up-check"
                value={isCheckReadTerms ? 'true' : 'false'}
                onCheckedChange={() =>
                  setIsCheckReadTerms((prevCheck) => !prevCheck)
                }
                required
              />
              <label htmlFor="sign-up-check" className="flex gap-x-2">
                <span>Agree with </span>
                <Link
                  href="/terms-and-conditions"
                  className="inline-block underline"
                >
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link href="/privacy-policy" className="inline-block underline">
                  Privay Policy
                </Link>
              </label>
            </div>

            {error && (
              <ul className="col-span-full">
                {error.map((e) => (
                  <li key={e.code} className="form-error-message">
                    {e.longMessage}
                  </li>
                ))}
              </ul>
            )}

            <div
              id="clerk-captcha"
              data-cl-theme="dark"
              data-cl-size="flexible"
              className="col-span-full"
            />

            <button
              type="submit"
              className={clsx(
                'col-span-full bg-brand-black text-brand-white font-semibold py-2 cursor-pointer',
                isCheckReadTerms
                  ? 'bg-brand-black pointer-events-auto'
                  : 'bg-brand-black/50 pointer-events-none',
              )}
              disabled={!isCheckReadTerms}
            >
              Sign Up
            </button>
          </form>
        )}

        <div className="hidden md:block">
          <Image
            src="/sign-up.jpg"
            alt="a woman standing in the moving crowd"
            width={400}
            height={600}
            className="saturate-0 min-w-full object-cover"
          />
        </div>
      </div>
    </Bounded>
  );
};

export default SignUpPage;
