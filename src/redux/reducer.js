import { types } from '@redux/actions'
import formTransformer from '@services/formTransformer'

const initialState = {
  loggedIn: false,
  loading: false,
  error: false,
  forms: [],
  isCompanyChosen: false,
  selectedCompany: { name: '', path: '', config: null },
  errorMessage: '',
  numberOfWow: 0,
  numberOfOk: 0,
  numberOfKo: 0
}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case types.LOGIN.REQUEST:
    case types.LOGOUT.REQUEST:
    case types.FETCH_FORMS.REQUEST:
      return {
        ...state,
        loading: true
      }
    case types.LOGIN.FAILURE:
    case types.LOGOUT.FAILURE:
    case types.FETCH_FORMS.FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.error
      }
    case types.LOGIN.SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        error: false
      }
    case types.LOGOUT.SUCCESS:
      return initialState
    case types.FETCH_FORMS.SUCCESS:
      const {
        forms,
        numberOfWow,
        numberOfOk,
        numberOfKo
      } = formTransformer(action.payload, action.company)
      return {
        ...state,
        loading: false,
        error: false,
        forms,
        numberOfWow,
        numberOfOk,
        numberOfKo
      }
    case types.COMPANY_SELECTED:
      return {
        ...state,
        isCompanyChosen: true,
        selectedCompany: action.company
      }
    default:
      return state
  }
}
