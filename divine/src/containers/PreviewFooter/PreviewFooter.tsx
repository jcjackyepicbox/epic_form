import React from 'react';
import classes from './PreviewFooter.module.css';

interface IProps {
  totalAnswer: number;
  totalUnasnwered: number;
}

function PreviewFooter({ totalAnswer, totalUnasnwered }: IProps) {
  return (
    <div className={classes.PreviewFooter}>
      <div className={classes.PoweredBar}>
        Powered by <span className={classes.PoweredTitle}>Epicform</span>
      </div>

      <div className={classes.ProgressBar}>
        <div className={classes.ProgressTitle}>
          {totalAnswer - totalUnasnwered} of {totalAnswer} answered
        </div>
        <div className={classes.BarContainer}>
          <div
            className={classes.BarFill}
            style={{
              width: `${
                ((totalAnswer - totalUnasnwered) / totalAnswer) * 100
              }%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default PreviewFooter;
