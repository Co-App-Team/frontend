// eslint was complaining about "motion" not being used, even though the import is needed for "motion.div"
/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';

const animations = {
  initial: { opacity: 0, x: 25 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -25 },
};

const PageTransition = ({ children }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}>
      {children}
    </motion.div>
  );
};
/* eslint-enable no-unused-vars */

export default PageTransition;
