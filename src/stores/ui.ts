import { observable } from 'mobx';

export class UiState{
    @observable currentPage = 0;
}


export default new UiState();