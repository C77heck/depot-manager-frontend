import { LangKey, useTranslateContext } from '../../../contexts/translate.context';
import { History } from './product-history-list';

export const ProductHistory = ({ data }: { data: History }) => {
    const { trans } = useTranslateContext();
    const type = trans(data.type as LangKey);
    switch (data.type) {
        case 'arrived':
            return <div className={'w-100 product-history bc-transfer-1 bgc-transfer-2'}>
                <h4 className={'color-transfer-1'}>{type}</h4>
                <div className={'row'}>
                    <div className={'col-12'}></div>
                    <div className={'col-12'}></div>
                </div>
            </div>;
        case 'sent':
            return <div className={'w-100 product-history bc-transfer-1 bgc-transfer-2'}>
                <h4 className={'color-transfer-1'}>{type}</h4>
                <div className={'row'}>
                    <div className={'col-12'}></div>
                    <div className={'col-12'}></div>
                </div>
            </div>;
        case 'transferred':
            return <div className={'w-100 product-history bc-transfer-1 bgc-transfer-2'}>
                <h4 className={'color-transfer-1'}>{type}</h4>
                <div className={'row'}>
                    <div className={'col-12'}></div>
                    <div className={'col-12'}></div>
                </div>
            </div>;
        default:
            return null;
    }

};
