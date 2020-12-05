import React, {useEffect, useState} from 'react'
import styles from './FilterLeft.module.sass'
import FilterRow from "../filterRow";

function FilterLeft( props ) {

    const {   ticketsIntitial,
            makefilterTickets
        } = props

    const [idChecked, setIdChecked] = useState("all")

    const filterMake = ( event ) => {

        const checked = event.target.checked
        const type = event.target.getAttribute("id")

        if(checked)
            setIdChecked(type)
        else
            console.log("unchecked!")

        let filterType
        let stopsCount = 0

        switch (type) {
            case "all":
                filterType = 'all'
                break;
            case "withoutStops":
                filterType = 'withoutStops'
                stopsCount = 0
                break;
            case "oneStop":
                filterType = 'oneStop'
                stopsCount = 1
                break;
            case "twoStops":
                filterType = 'twoStops'
                stopsCount = 2
                break;
            case "threeStops":
                filterType = 'threeStops'
                stopsCount = 3
                break;
            default:
                filterType = 'all'
        }

        if( filterType != 'all') {

            let filteredTickets = ticketsIntitial.filter(
                ticket => ticket.segments.every
                ( segment => segment.stops.length === stopsCount)
            )

            makefilterTickets(filteredTickets)
        } else {
            console.log("59 ticketsIntitial = ")
            console.log(ticketsIntitial)
            makefilterTickets(ticketsIntitial)
        }
    }

    const checkBoxChecked =( id ) => {

        if(id != idChecked)
            return false
        else
            return true
    }

    return (
        <>
            <div className={styles.filter}>
                <div className={styles.filterName}>
                    Количество пересадок
                </div>
                <div className={styles.filterSetting}>
                    <FilterRow id={"all"} text={"Все"} checkBoxChecked={checkBoxChecked} filterMake={filterMake} />
                    <FilterRow id={"withoutStops"} text={"Без пересадок"}  checkBoxChecked={checkBoxChecked} filterMake={filterMake} />
                    <FilterRow id={"oneStop"} text={"1 пересадка"}  checkBoxChecked={checkBoxChecked} filterMake={filterMake} />
                    <FilterRow id={"twoStops"} text={"2 пересадки"}  checkBoxChecked={checkBoxChecked} filterMake={filterMake}  />
                    <FilterRow id={"threeStops"} text={"3 пересадки"}  checkBoxChecked={checkBoxChecked} filterMake={filterMake} />
                </div>
            </div>
        </>
    )
}

export default FilterLeft