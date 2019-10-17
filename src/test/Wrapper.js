import React from 'react'

const configContext = {
    roles: [{name:"сотрудник", value:"employee"}, {name:"клиент", value:"client"}],
    locales: ["ru", "en"]
};
export const Contexts = React.createContext("");

export default function Wrap(Component) {

    const {Provider} = Contexts;
    class HCO extends React.PureComponent {
        static contextType = Contexts;
        render() {
            return  <Provider value={configContext} > <Component/></Provider>
        }
    }

    return HCO
}
