import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ResendCodeButton = ({ resendCodeCallback, isLoading }) => {
  const [resendCodeCooldown, setResendCodeCooldown] = useState(0);

  useEffect(() => {
    let timerId;

    if (resendCodeCooldown > 0) {
      timerId = setInterval(() => {
        setResendCodeCooldown((prevCount) => prevCount - 1);
      }, 1000);
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [resendCodeCooldown]);

  const resendCode = async (e) => {
    e.preventDefault();

    if (resendCodeCooldown == 0) {
      await resendCodeCallback();
      setResendCodeCooldown(30);
    }
  };

  return (
    <Link
      onClick={resendCode}
      className={resendCodeCooldown > 0 || isLoading ? 'text-muted text-decoration-none' : ''}
      style={{
        pointerEvents: resendCodeCooldown > 0 || isLoading ? 'none' : 'auto',
        cursor: resendCodeCooldown > 0 || isLoading ? 'not-allowed' : 'pointer',
      }}>
      {resendCodeCooldown > 0 && <>wait {resendCodeCooldown}s to </>}
      resend the code
    </Link>
  );
};

export default ResendCodeButton;
