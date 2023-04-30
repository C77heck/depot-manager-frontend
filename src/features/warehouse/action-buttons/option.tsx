import { Hr } from '../../shared-ui/hr';
import { MinusIcon, PlusIcon } from '../../shared-ui/icons/icons';
import { Product } from '../product-history/product-history-list';

export interface OptionProps {
    onAdd: (id: string) => void;
    onRemove: (id: string) => void;
    imgSrc: string;
    data: Product;
    limit?: number;
    cart: Record<string, number>;
}

export const formatLongText = (text: string, maxLength: number) => {
    if (!text) {
        return '';
    }
    if (text.length <= maxLength) {
        return text;
    }

    return `${text.slice(0, maxLength)}...`;
};

export const Option = ({ onAdd, onRemove, data, cart, limit }: OptionProps) => {
    const hasLimit = limit !== undefined;
    const cartAmount = cart?.[data?._id] || 0;
    const handleAdd = () => {
        if (hasLimit && limit < (cartAmount + 1)) {
            return;
        }
        onAdd(data._id);
    };

    return <div className={'row product-card'}>
        <div className={'col-24'}>{formatLongText(data.title, 30)}</div>
        <div className={'col-24 center py-10'}>
            <img className={'product-image'} src={data.image} alt={'product image'}/>
        </div>
        <div className={'row center'}>
            <div className={'col-17'}>
                <Hr className={'my-10'}/>
            </div>
        </div>
        <div className={'col-9 center'}>
            <div onClick={() => onRemove(data._id)} className={'round center hover-opacity active-lift'}>
                <MinusIcon width={20}/>
            </div>
        </div>
        <div className={'col-6 center pb-4'}>
            <span className={'fs-14 fw--700'}>{cartAmount}</span>
        </div>
        <div className={'col-9 center'}>
            <div onClick={() => handleAdd()} className={'round center hover-opacity active-lift'}>
                <PlusIcon width={20}/>
            </div>
        </div>
    </div>;
};
