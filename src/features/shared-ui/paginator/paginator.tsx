import React from 'react';
import { ArrowLeft, ArrowRight } from '../icons/icons';

export interface PaginationProp {
    startDot: boolean;
    startDotRef: number | boolean;
    start: number | null;
    endDot: number | boolean;
    endDotRef: number | boolean;
    end: number | null;
    middle: any[] | null;
}

export interface PaginatorProps {
    maxLength?: number;
    pageChange: (page: number) => void;
    total: number;
    currentPage: number;
}

export interface PaginatorState {
    paginationMap: PaginationProp | null;
    activeItem: number,
}

export class Paginator extends React.Component<PaginatorProps, PaginatorState> {
    public paginationMap: PaginationProp = {
        startDot: false,
        startDotRef: false,
        start: 0,
        endDot: false,
        endDotRef: false,
        middle: [],
        end: null,
    };

    public state: PaginatorState = {
        activeItem: NaN,
        paginationMap: null
    };

    public componentDidMount() {
        this.setPagination();
    }

    public componentDidUpdate(prevProps: Readonly<PaginatorProps>, prevState: Readonly<any>, snapshot?: any) {
        if (prevProps?.currentPage !== this.props.currentPage) {
            this.setPagination();
        }
        if (prevProps?.total !== this.props.total) {
            this.setPagination();
        }
    }

    public getMiddlePaginatorValues(pages: number[], page: number): number[] {
        const trimmedPages = pages.slice(1, pages.length - 1).map(i => i);

        switch (page) {
            case 0:
                return trimmedPages.slice(0, page + 4);
            case 1:
                return trimmedPages.slice(page - 1, page + 2);
            case pages.length - 1:
                return trimmedPages.slice(page - 4, page);
            default:
                return page > pages.length - 4
                    ? trimmedPages.slice(page - 3, page + 1)
                    : trimmedPages.slice(page - 2, page + 2);
        }
    }

    public getPaginationMap(total: number, page: number = 1): PaginationProp {
        const paginationMaxLength = this.props?.maxLength || 7;
        if (total <= 1) {
            return this.paginationMap;
        }

        const pages = Array.from({ length: total }, (v, i) => i);
        const start = pages[0];
        const end = pages[pages.length - 1];

        if (pages.length <= paginationMaxLength) {
            return {
                ...this.paginationMap,
                start: start,
                middle: pages.slice(1, pages.length - 1),
                end: end
            };
        }

        const middle = this.getMiddlePaginatorValues(pages, page);

        return {
            start: start,
            startDot: pages.length > paginationMaxLength && page > 2,
            startDotRef: middle[0] - 1,
            middle: middle,
            endDot: pages.length > paginationMaxLength && page <= pages.length - 5,
            endDotRef: middle[middle.length - 1] + 1,
            end: end
        };
    }

    public renderOption({ item, isDot }: any) {
        const classes = this.getClasses(this.state.activeItem === item, 'background-color--secondary-1 color--light', 'hover-primary');

        return <div key={item} className={`px-2 min-width-fit-content w-px-30 ${classes} center border-radius-px-4`}>
            <a
                className={'text--paginator cursor-pointer w-100 center'}
                onClick={() => this.manageOnChange(item)}
            >
                <span className={'color--text-1'}>{!isDot ? item + 1 : '...'}</span>
            </a>
        </div>;
    }

    public manageOnChange(item: number) {
        this.setState({ activeItem: item });

        this.props.pageChange(item);
    }

    public renderNext() {
        const { total, currentPage } = this.props;
        const isActive = currentPage < total - 1 && total !== 1;
        const colour = isActive ? 'hover-primary' : 'color--disabled';

        return <div
            className={'px-10 cursor-pointer display-flex align-items-end'}
            onClick={() => isActive && this.manageOnChange(currentPage + 1)}
        >
            <ArrowRight
                className={`${colour} px-10 cursor-pointer`}
                width={16}
            />
        </div>;
    }

    public renderPrev() {
        const { currentPage } = this.props;
        const isActive = currentPage > 0;
        const colour = isActive ? 'hover-primary' : 'color--dark-3';

        return <div
            className={'px-10 cursor-pointer display-flex align-items-end'}
            onClick={() => isActive && this.manageOnChange(currentPage - 1)}
        >
            <ArrowLeft
                className={`${colour} px-10 cursor-pointer`}
                width={16}
            />
        </div>;
    }

    public getClasses(isTrue: boolean, classIfTrue: string, classIfFalse = '') {
        return isTrue ? classIfTrue : classIfFalse;
    }

    public setPagination() {
        const { total, currentPage } = this.props;
        const paginationMap = this.getPaginationMap(total, currentPage);

        this.setState({ paginationMap, activeItem: currentPage });
    }

    public render() {
        const startDot = this.state.paginationMap?.startDot;
        const startDotRef = this.state.paginationMap?.startDotRef;
        const start = this.state.paginationMap?.start;
        const endDot = this.state.paginationMap?.endDot;
        const endDotRef = this.state.paginationMap?.endDotRef;
        const end = this.state.paginationMap?.end;
        const middle = this.state.paginationMap?.middle;

        return <div className={'center py-6 mt-7 col-100'}>
            {this.renderPrev()}
            {this.renderOption({ ...this.props, item: start })}
            {startDot && this.renderOption({ ...this.props, item: startDotRef, isDot: true })}
            {(middle || []).map(item => this.renderOption({ ...this.props, item, key: item }))}
            {endDot && this.renderOption({ ...this.props, item: endDotRef, isDot: true })}
            {end && this.renderOption({ ...this.props, item: end })}
            {this.renderNext()}
        </div>;
    }
}
