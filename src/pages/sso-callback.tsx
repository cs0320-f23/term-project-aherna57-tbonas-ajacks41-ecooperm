import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SsoCallbackPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Here you would handle the SSO callback logic.
    // Once done, you can redirect the user to the desired page.
    const redirectUrl = "/home";
    router.push(redirectUrl);
  }, [router]);

  return <></>; // Render an empty fragment
};

export default SsoCallbackPage;