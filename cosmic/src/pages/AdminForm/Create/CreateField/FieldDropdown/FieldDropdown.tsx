import React, { useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import {
  SETTING_TYPE,
  ICON_TYPE,
} from '../../../../../../interfaces/form/form.interface';
import IconShortSvg from '../../../../../svg/IconShortSvg';
import IconThankyouSvg from '../../../../../svg/IconThankyouSvg';
import IconWelcomeSvg from '../../../../../svg/IconWelcomeSvg';
import classes from './FieldDropdown.module.css';
import IconButton from '../../../../../components/IconButton/IconButton';
import CloseSvg from '../../../../../svg/CloseSvg';
import { IDropdownFormSettings } from '../CreateField';
import IconChoiceSvg from '../../../../../svg/IconChoiceSvg';
import IconYesNoSvg from '../../../../../svg/IconYesNoSvg';
import IconNumberSvg from '../../../../../svg/IconNumberSvg';

interface IProps {
  openDropdown: boolean;
  formSettings: IDropdownFormSettings[];
  addQuestion: (type_id: SETTING_TYPE) => void;
  onCloseDropdown: () => void;
  ddlContainerRef: DOMRect | undefined;
}

function getInitialActiveForm(formSettings: IDropdownFormSettings[]) {
  const filteredFormSettings = formSettings.filter(
    (val) => val.disable === false
  );

  if (filteredFormSettings.length > 0) {
    return filteredFormSettings[0];
  }

  return null;
}

function FieldDropdown({
  openDropdown,
  formSettings,
  addQuestion,
  onCloseDropdown,
  ddlContainerRef,
}: IProps) {
  const [activeForm, setActiveForm] = useState<IDropdownFormSettings | null>(
    () => getInitialActiveForm(formSettings)
  );
  const [ddlUpward, setDdlUpward] = useState<boolean>(false);
  const ddlDropdownRef = useRef<HTMLDivElement | null>(null);

  function onListHover(formSetting: IDropdownFormSettings) {
    setActiveForm(formSetting);
  }

  useEffect(() => {
    const activeForm = getInitialActiveForm(formSettings);
    setActiveForm(activeForm);
  }, [formSettings]);

  useEffect(() => {
    const topCon = ddlContainerRef?.top || 0;
    const heightCon = ddlContainerRef?.height || 0;
    const heightDdl =
      ddlDropdownRef.current?.getBoundingClientRect().height || 0;

    if (topCon + heightCon + heightDdl > window.document.body.clientHeight) {
      setDdlUpward(true);
    } else {
      setDdlUpward(false);
    }
  }, [ddlContainerRef?.top, ddlDropdownRef.current]);

  function handleOutsideClick(e: MouseEvent) {
    if (!ddlDropdownRef.current?.contains(e.target)) {
      onCloseDropdown();
    }
  }

  useEffect(() => {
    if (openDropdown) {
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [openDropdown]);

  const questionListItems = formSettings.map((val) => {
    const { type_name, icon, type_id, type_color } = val;
    const iconComponent = mapIconCompoennt(icon);
    return (
      <li
        role="listitem"
        key={type_id}
        className={cx({
          [classes.active]: type_id === activeForm?.type_id,
          [classes.disable]: val.disable,
        })}
        onMouseEnter={val.disable ? undefined : () => onListHover(val)}
        onClick={() => addQuestion(type_id)}
      >
        <span className={classes.NFListIcon} style={{ background: type_color }}>
          {iconComponent}
        </span>
        <span className={classes.NFListItem}>{type_name}</span>
      </li>
    );
  });

  if (!openDropdown) {
    return null;
  }

  return (
    <div
      className={classes.NewFieldDropdown}
      ref={ddlDropdownRef}
      style={{
        bottom: ddlUpward === true ? ddlContainerRef?.height || 'auto' : 'auto',
      }}
    >
      <div className={classes.NewFieldTypeList}>
        <div className={classes.NewFieldTypeTitle}>Choose Question Type</div>
        <ul role="list">{questionListItems}</ul>
      </div>

      <div className={classes.NewFieldTypeDescription}>
        <div className={classes.NewFieldClose}>
          <IconButton onClick={onCloseDropdown}>
            <CloseSvg color="#969696" width={12} height={12} />
          </IconButton>
        </div>
        <div className={classes.DescriptionImage}>
          <img src={activeForm?.type_image} alt={activeForm?.type_name} />
        </div>
        <div className={classes.DescriptionTitle}>{activeForm?.type_name}</div>
        <div className={classes.DescriptionDesc}>{activeForm?.type_desc}</div>
      </div>
    </div>
  );
}

export function mapIconCompoennt(icon_name: ICON_TYPE) {
  switch (icon_name) {
    case 'welcome':
      return <IconWelcomeSvg color="#fff" />;
    case 'thankyou':
      return <IconThankyouSvg color="#fff" />;
    case 'short':
      return <IconShortSvg color="#fff" />;
    case 'choice':
      return <IconChoiceSvg color="#fff" />;
    case 'yesno':
      return <IconYesNoSvg color="#fff" />;
    case 'number':
      return <IconNumberSvg color="#fff" />;
    default:
      return <></>;
  }
}

export default FieldDropdown;
