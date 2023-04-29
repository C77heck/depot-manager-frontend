import { useTranslateContext } from '../contexts/translate.context';
import { DepotList } from '../features/depots/depot-list';
import { ScreenProps, ScreenRoute } from './libs/screen.route';

export const HomeScreen = (props: ScreenProps) => {
    const { trans } = useTranslateContext();

    return <ScreenRoute {...props}>
        <DepotList/>
    </ScreenRoute>;
};
