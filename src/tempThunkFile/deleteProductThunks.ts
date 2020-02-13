import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {ShopAPI} from "../tp-3-dal/ShopAPI";
import {getProducts} from "./getProductsThunks";
import {IAppStore} from "../../../../neko-1-main/m-2-bll/store";
import {ITableActions} from "../../../f-3-common/c-5-table/t-1-table/t-2-bll/b-2-redux/tableActions";
import {
    tableError, tableLoading, tableSuccess
} from "../../../f-3-common/c-5-table/t-1-table/t-2-bll/b-1-callbacks/tableBooleanCallbacks";

type Return = void;
type ExtraArgument = {};
type IGetStore = () => IAppStore;

export const deleteProduct = (id: string): ThunkAction<Return, IAppStore, ExtraArgument, ITableActions> =>
    async (dispatch: ThunkDispatch<IAppStore, ExtraArgument, ITableActions>, getStore: IGetStore) => {

        tableLoading(dispatch, true, 'shop');

        try {
            const data = await ShopAPI.deleteProduct(id);
            if (data.error) {
                tableError(dispatch, data.error, 'shop');

                console.log('Shop Delete Product Error!', data.error);
            } else {
                tableSuccess(dispatch, true, 'shop');

                console.log('Neko Delete Product Success!', data);
                dispatch(getProducts());
            }
        } catch (e) {
            tableError(dispatch, e.response ? e.response.data.error : e.message, 'shop');

            console.log('Neko Delete Product Error!', {...e})
        }
    };
