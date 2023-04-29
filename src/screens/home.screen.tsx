import { useTranslateContext } from '../contexts/translate.context';
import { ActionButtons } from '../features/depots/action-buttons';
import { DepotList } from '../features/depots/depot-list';
import { ScreenProps, ScreenRoute } from './libs/screen.route';

export const HomeScreen = (props: ScreenProps) => {

    return <ScreenRoute {...props}>
        <ActionButtons/>
        <DepotList/>
    </ScreenRoute>;
};
