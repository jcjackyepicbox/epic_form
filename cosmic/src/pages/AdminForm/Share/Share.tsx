import PreviewForm from '@epic-form/divine';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../../../redux/reducers';
import AdminButton from '../../../components/AdminButton/AdminButton';
import FormNavbar, {
  FORM_MENU,
} from '../../../components/FormNavbar/FormNavbar';
import ModalFullPage from '../../../components/ModalFullPage/ModalFullPage';
import UserLayout from '../../../components/UserLayoutHeader/UserLayoutHeader';
import { defaultUserData } from '../../../data/user.data';
import LinkSvg from '../../../svg/LinkSvg';
import ViewSvg from '../../../svg/ViewSvg';
import classes from './Share.module.css';

function Share() {
  const { image, display_name } =
    useSelector((state: ApplicationState) => state.user.user) ||
    defaultUserData;

  const { formData } = useSelector((state: ApplicationState) => state.form);
  const linkUrl = `http://localhost:3018?form=${formData._id}`;
  const { isCopied, onCopy } = useCopyClipboard(linkUrl);
  const [openPreview, setOpenPreview] = useState<boolean>(false);

  return (
    <>
      {openPreview && (
        <ModalFullPage
          title="Current Draft Preview"
          onClose={() => setOpenPreview(false)}
        >
          <PreviewForm formData={formData} isDevelopment={true} />
        </ModalFullPage>
      )}
      <div className={classes.SharePageContainer}>
        <UserLayout profileImage={image} userName={display_name}>
          <FormNavbar title={formData.title} activeMenu={FORM_MENU.SHARE}>
            <AdminButton color="greywhite" onClick={() => setOpenPreview(true)}>
              <ViewSvg
                color="rgb(38, 38, 39)"
                height={14}
                width={14}
                verticalAlign="middle"
              />
              <span className={classes.ViewButtonText}>View</span>
            </AdminButton>
          </FormNavbar>
        </UserLayout>

        <div className={classes.ShareContainer}>
          <div className={classes.ShareWidgetContainer}>
            <div className={classes.WidgetTitle}>Share your epicform</div>
            <div className={classes.WidgetList}>
              <div className={classes.ShareLinkContainer}>
                <LinkSvg width={24} height={24} />
                <div className={classes.ShareLinkTitle}>
                  Get the link or share on social media
                </div>
                <div className={classes.ShareInput}>
                  <div className={classes.InputContainer}>
                    <input
                      type="text"
                      readOnly
                      title="share link"
                      value={linkUrl}
                    />
                  </div>
                  <AdminButton color="black" borderLess onClick={onCopy}>
                    {isCopied ? 'Copied!' : 'Copy Link'}
                  </AdminButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function useCopyClipboard(url: string) {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    if (isCopied) {
      const timerReset = setTimeout(() => setIsCopied(false), 2000);

      return () => clearTimeout(timerReset);
    }
  }, [isCopied]);

  function onCopy() {
    navigator.clipboard.writeText(url);
    setIsCopied(true);
  }

  return {
    isCopied,
    onCopy,
  };
}

export default Share;
