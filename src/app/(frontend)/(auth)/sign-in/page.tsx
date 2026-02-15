'use client';

import Bounded from '@/components/shared/Bounded';
import { useSignIn } from '@clerk/nextjs';
import { ClerkAPIError, OAuthStrategy } from '@clerk/types';
import { useState } from 'react';
import { isClerkAPIResponseError } from '@clerk/nextjs/errors';
import { useRouter } from 'next/navigation';
import PageTitle from '@/components/shared/PageTitle';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PiEyeSlashThin, PiEyeThin } from 'react-icons/pi';
import { BiLogoApple, BiLogoGithub, BiLogoGoogle } from 'react-icons/bi';

const SignInPage = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [errors, setErrors] = useState<ClerkAPIError[]>();
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleOAuth = async (strategy: OAuthStrategy) => {
    if (!isLoaded) return;
    setErrors(undefined);

    try {
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/user',
      });
    } catch (error: any) {
      if (isClerkAPIResponseError(error)) setErrors(error.errors);
      console.error(error);
    }
  };

  const handleSignIn = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setErrors(undefined);

    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

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

  const OAUTH_LINKS = [
    { name: 'Goolge', strategy: 'oauth_google', icon: <BiLogoGoogle /> },
    { name: 'Github', strategy: 'oauth_github', icon: <BiLogoGithub /> },
    { name: 'Apple', strategy: 'oauth_apple', icon: <BiLogoApple /> },
  ];

  return (
    <Bounded isPadded>
      <PageTitle>Sign In</PageTitle>
      <div className="grid md:grid-cols-2 md:gap-x-5">
        <form onSubmit={handleSignIn} className="flex flex-col gap-y-3">
          {/* oauth sign in */}
          <div className="grid grid-cols-3 gap-x-2">
            {OAUTH_LINKS.map((l) => (
              <Button
                type="button"
                variant="oauth"
                key={l.name}
                onClick={() => handleOAuth(l.strategy as OAuthStrategy)}
              >
                {l.icon}
              </Button>
            ))}
          </div>

          <div className="flex col-span-full items-center">
            <div className="divider w-[30%]"></div>
            <p className="text-fs-300">Or sign in with</p>
            <div className="divider w-[30%]"></div>
          </div>

          {/* email sign in */}
          <div className="space-y-1">
            <label htmlFor="sign-in-email" className="form-label">
              Email
            </label>
            <Input
              type="email"
              id="sign-in-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-1">
            <div className="relative">
              <label htmlFor="sign-in-password" className="form-label relative">
                Password
              </label>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                id="sign-in-password"
                onChange={(e) => setPassword(e.target.value)}
                className="relative"
              />
              <Button
                type="button"
                variant="search"
                className="absolute right-0 cursor-pointer"
                onClick={() => setShowPassword((prevShow) => !prevShow)}
              >
                {showPassword ? <PiEyeSlashThin /> : <PiEyeThin />}
              </Button>
            </div>
          </div>

          <div className="self-end">
            <Link
              href="/forget-password"
              className="text-fs-300 text-brand-pink underline"
            >
              Forget password
            </Link>
          </div>

          {errors && (
            <ul>
              {errors.map((e) => (
                <li key={e.code} className="form-error-message">
                  {e.longMessage}
                </li>
              ))}
            </ul>
          )}

          <Button variant="submit" type="submit">
            Sign In
          </Button>

          <p>
            Not a member yet?{' '}
            <Link href="/sign-up" className="underline">
              Sign Up
            </Link>
          </p>
        </form>

        <div className="hidden md:block overflow-hidden">
          <Image
            src="/sign-in.jpg"
            alt="a woman standing in the crowd"
            width={600}
            height={800}
            className="min-w-full saturate-0 object-cover"
          />
        </div>
      </div>

      <div
        id="clerk-captcha"
        data-cl-theme="dark"
        data-cl-size="flexible"
        data-cl-language="es-ES"
      />
    </Bounded>
  );
};

export default SignInPage;
