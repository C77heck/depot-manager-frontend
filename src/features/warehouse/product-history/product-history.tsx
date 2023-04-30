import moment from 'moment';
import { LangKey, useTranslateContext } from '../../../contexts/translate.context';
import { RightArrow } from '../../shared-ui/icons/icons';
import { History } from './product-history-list';

export const ProductHistory = ({ data }: { data: History }) => {
    const { trans } = useTranslateContext();
    const type = trans(data.type as LangKey);
    const date = moment(data.createdAt).format('YYYY.MM.DD.');

    switch (data.type) {
        case 'arrived':
            return <div className={'w-100 product-history bc-arrived-1 bgc-arrived-2 my-5'}>
                <div className={'row'}>
                    <div className={'col-24 mb-5'}>
                        <h4 className={'color-arrived-1 fs-16'}>{data.product.title}</h4>
                    </div>
                    <div className={'col-12'}>
                        <h4 className={'color-arrived-1 fs-16'}>{type}</h4>
                    </div>
                    <div className={'col-12 display-flex justify-content-end'}>
                        <h4 className={'color-arrived-1 fs-16'}>{date}</h4>
                    </div>
                </div>
            </div>;
        case 'sent':
            return <div className={'w-100 product-history bc-sent-1 bgc-sent-2 my-5'}>
                <div className={'row'}>
                    <div className={'col-24 mb-5'}>
                        <h4 className={'color-sent-1 fs-16'}>{data.product.title}</h4>
                    </div>
                    <div className={'col-12'}>
                        <h4 className={'color-sent-1 fs-16'}>{type}</h4>
                    </div>
                    <div className={'col-12 display-flex justify-content-end'}>
                        <h4 className={'color-sent-1 fs-16'}>{date}</h4>
                    </div>
                </div>
            </div>;
        case 'transferred':
            return <div className={'w-100 product-history bc-transfer-1 bgc-transfer-2 my-5'}>
                <div className={'row'}>
                    <div className={'col-24 mb-5'}>
                        <h4 className={'color-transfer-1 fs-16'}>{data.product.title}</h4>
                    </div>
                    <div className={'col-12'}>
                        <h4 className={'color-transfer-1 fs-16'}>{type}</h4>
                    </div>
                    <div className={'col-12 display-flex justify-content-end'}>
                        <h4 className={'color-transfer-1 fs-16'}>{date}</h4>
                    </div>
                </div>
                <div className={'row mt-5'}>
                    <div className={'col-10'}>
                        <h4 className={'color-transfer-1 fs-16'}>{data?.from?.name}</h4>
                    </div>
                    <div className={'col-4 center'}>
                        <RightArrow className={'color-transfer-1'} width={20}/>
                    </div>
                    <div className={'col-10 display-flex justify-content-end'}>
                        <h4 className={'color-transfer-1 fs-16'}>{data?.to?.name}</h4>
                    </div>
                </div>
            </div>;
        default:
            return null;
    }

};
