import {
    AccountBalanceOutlined,
    AttachMoneyOutlined, CardGiftcardOutlined,
    CommuteOutlined, CreditCardOutlined, FlightOutlined,
    HealingOutlined,
    HomeOutlined,
    MoneyOffOutlined, MoodOutlined, PetsOutlined,
    RestaurantOutlined,
    SchoolOutlined
} from "@material-ui/icons";

export const spentCategories = new Map([
    ["Casa", {icon: HomeOutlined, color: "#388e3c", weight: 1}],
    ["Impostos", {icon: MoneyOffOutlined, color: "#c62828", weight: 0.5}],
    ["Restauração", {icon: RestaurantOutlined, color: "#5c276b", weight: 0.3}],
    ["Transporte", {icon: CommuteOutlined, color: "#303f9f", weight: 0.1}],
    ["Educação", {icon: SchoolOutlined, color: "#f5cb00", weight: 0.2}],
    ["Saúde", {icon: HealingOutlined, color: "#0097a7", weight: 0.1}],
    ["Férias", {icon: FlightOutlined, color: "#d84315", weight: 0.05}],
    ["Diversão", {icon: MoodOutlined, color: "#ed276b", weight: 0.1}],
    ["Animais de Estimação", {icon: PetsOutlined, color: "#191919", weight: 0.1}],
]);

export const earnedCategories = new Map([
    ["Salário", {icon: AttachMoneyOutlined, color: "#388e3c", weight: 1.25}],
    ["Empréstimo", {icon: AccountBalanceOutlined, color: "#f5cb00", weight: 0.5}],
    ["Oferta", {icon: CardGiftcardOutlined, color: "#303f9f", weight: 0.01}],
    ["Prémio", {icon: CreditCardOutlined, color: "#d84315", weight: 0.2}],
]);





