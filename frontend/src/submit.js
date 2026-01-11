// submit.js
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check } from 'lucide-react';

export const SubmitButton = ({setModal}) => {
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (submitted) {
      const hideTimer = setTimeout(() => setVisible(false), 1200);
      const showTimer = setTimeout(() => {
        setSubmitted(false);
        setVisible(true);
      }, 3000);

      return () => {
        clearTimeout(hideTimer);
        clearTimeout(showTimer);
      };
    }
  }, [submitted]);
  return (
    <div className="flex justify-center  items center w-screen p-3">
      <div>
        <AnimatePresence>
          {visible && (
            <motion.button
              onClick={() =>{
                 setSubmitted(true);
                 setModal(true);}
                }
              whileTap={{ scale: 0.95 }}
              exit={{ opacity: 0, scale: 0.5 }}
              animate={{
                backgroundColor: submitted ? '#35db3a' : '#111827',
                width: submitted ? 44 : 120,
                borderRadius: submitted ? "9999px" : "12px",
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="flex h-11 items-center justify-center overflow-hidden rounded-lg text-sm  font-medium text-white"
            >
              {submitted ? (
                <motion.div

                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <Check className=" h-5 w-5" />
                </motion.div>
              ) : (
                <motion.span initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  Submit
                </motion.span>
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
