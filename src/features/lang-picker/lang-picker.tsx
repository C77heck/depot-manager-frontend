import * as React from 'react';
import { AvailableLang, useTranslateContext } from '../../contexts/translate.context';

export const LangPicker = () => {
    const { changeLang, lang } = useTranslateContext();

    return <button className={'center nav-bar-item bgc-primary-1'}>
        <div className={'w-100 display-flex justify-content-space-around'}>
            <div
                onClick={() => changeLang(AvailableLang.en)}
                className={`w-25 center hover-scale round ${lang === AvailableLang.en ? 'border-1' : ''}`}
            >
                <img className={'w-100'} src={'/src/assets/images/english-flag.png'} alt={'english flag'}/>
            </div>
            <div
                onClick={() => changeLang(AvailableLang.hu)}
                className={`w-25 center hover-scale round ${lang === AvailableLang.hu ? 'border-1' : ''}`}
            >
                <img className={'w-100'} src={'/src/assets/images/hungarian-flag.png'} alt={'hungarian flag'}/>
            </div>
        </div>
    </button>;
};
