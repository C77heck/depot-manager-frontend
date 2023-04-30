import { useTranslateContext } from '../../../contexts/translate.context';
import { Button } from '../../shared-ui/buttons/button';
import { Warehouse } from '../warehouse-list';
import { GetPackages } from './get-packages';

export interface WarehouseActionsButtonsProps {
    data: Warehouse;
}

export const WarehouseActionsButtons = ({ data }: WarehouseActionsButtonsProps) => {
    console.log(data);
    const { trans } = useTranslateContext();

    return <div className={'row'}>
        <div className={'col-6 center'}>
            <div className={'w-70'}>
                <GetPackages warehouseId={data?._id || ''}/>
            </div>

        </div>
        <div className={'col-6 center'}>
            <Button className={'w-70'} buttonStyle={'action'}>
                <span className={'color-light-1 fs-14'}>{trans('send.package')}</span>
            </Button>
        </div>
        <div className={'col-6 center'}>
            <Button className={'w-70'} buttonStyle={'action'}>
                <span className={'color-light-1 fs-14'}>{trans('transfer.packages')}</span>
            </Button>
        </div>
        <div className={'col-6 center'}>
            <Button className={'w-70'} buttonStyle={'action'}>
                <span className={'color-light-1 fs-14'}>{trans('change.status')}</span>
            </Button>
        </div>
    </div>;
};
