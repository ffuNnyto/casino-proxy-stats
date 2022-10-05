import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    version:'v1.0',
    hacksawdb: '',
    currentTab: 'Account/Balances',
    appConnected: false,
    hacksawdb: {},
    pragmaticdb: {},
    hacksaw: {
        label: 'Hacksaw',
        links: []
    },
    pragmatic: {
        label: 'Pragmatic',
        links: []
    }
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setHacksawDb: (state, action) => {

            if (state.hacksaw.links.length > 2)
                state.hacksaw.links.splice(2, state.hacksaw.links.length)


            state.hacksawdb = action.payload;
            const arrayNames = Object.getOwnPropertyNames(action.payload);

            arrayNames.map((name) => {
                state.hacksaw.links = [...state.hacksaw.links, {
                    label: name,
                    link: `/hacksaw/${name}`
                }];
            })


        },
        setPragmaticDb: (state, action) => {

            if (state.pragmatic.links.length > 2)
                state.pragmatic.links.splice(2, state.pragmatic.links.length)

            state.pragmaticdb = action.payload;

            const arrayNames = Object.getOwnPropertyNames(action.payload);

            arrayNames.map((name) => {
                state.pragmatic.links = [...state.pragmatic.links, {
                    label: state.pragmaticdb[name].label,
                    link: `/pragmatic/${name}`
                }];
            })


        },
        handleConnectedApp: (state) => {
            state.appConnected = !state.appConnected;
        }

    },
})

export const { setHacksawDb, setPragmaticDb, handleConnectedApp } = appSlice.actions

export default appSlice.reducer