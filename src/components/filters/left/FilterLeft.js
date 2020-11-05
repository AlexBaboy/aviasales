import React, {useEffect, useState} from 'react'
import styles from './FilterLeft.module.sass'
import FilterRow from "../filterRow";

function FilterLeft( props ) {

    let {   ticketsIntitial,
            makefilterTickets
        } = props

    return (
        <>
            <div className={styles.filter}>
                <div className={styles.filterName}>
                    Количество пересадок
                </div>
                <div className={styles.filterSetting}>
                    <FilterRow id={"all"} text={"Все"} makefilterTickets={makefilterTickets} ticketsIntitial={ticketsIntitial} />
                    <FilterRow id={"withoutStops"} text={"Без пересадок"} makefilterTickets={makefilterTickets} ticketsIntitial={ticketsIntitial}/>
                    <FilterRow id={"oneStop"} text={"1 пересадка"} makefilterTickets={makefilterTickets} ticketsIntitial={ticketsIntitial} />
                    <FilterRow id={"twoStops"} text={"2 пересадки"} makefilterTickets={makefilterTickets} ticketsIntitial={ticketsIntitial} />
                    <FilterRow id={"threeStops"} text={"3 пересадки"} makefilterTickets={makefilterTickets} ticketsIntitial={ticketsIntitial}/>
                </div>
            </div>
        </>
    )
}

export default FilterLeft