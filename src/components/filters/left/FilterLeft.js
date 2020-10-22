import React, {useEffect, useState} from 'react'
import styles from './FilterLeft.module.sass'

function FilterLeft( props ) {

    let {   ticketsIntitial,
            makefilterTickets
        } = props

    const filterMake = ( element, type = "all" ) => {
        const checked = element.target.checked
        const val = type

        if(checked)
            console.log()
        //setCheckBoxChecked(false)
        else
            console.log("unchecked!")

        let filterType
        let stopsCount = 0

        switch (type) {
            case "all":
                filterType = 'all'
                //setCheckBoxChecked(true)
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
        console.log("filterType = " + filterType)
        console.log("stopsCount = " + stopsCount)

        if( filterType != 'all') {

            let filteredTickets = ticketsIntitial.filter(
                ticket => ticket.segments.some
                ( segment => segment.stops.length === stopsCount)
            )

            makefilterTickets(filteredTickets)
        } else {
            makefilterTickets(ticketsIntitial)
        }
    }

    const checkBoxChecked =() => {

    }

    return (
        <>
            <div className={styles.filter}>
                <div className={styles.filterName}>
                    Количество пересадок
                </div>
                <div className={styles.filterSetting}>
                    <div className={styles.filterRow}>
                        <input className={styles.filterCheckbox} type="checkbox" id="all" checked={checkBoxChecked} onChange={e =>filterMake(e,e.target.getAttribute("id")?.toString())} />
                        <label htmlFor="all">Все</label>
                    </div>
                    <div className={styles.filterRow}>
                        <input className={styles.filterCheckbox} type="checkbox" id="withoutStops" checked={checkBoxChecked} onChange={e =>filterMake(e,e.target.getAttribute("id")?.toString())}/>
                        <label htmlFor="withoutStops">Без пересадок</label>
                    </div>
                    <div className={styles.filterRow}>
                        <input className={styles.filterCheckbox} type="checkbox" id="oneStop" checked={checkBoxChecked} onChange={e =>filterMake(e,e.target.getAttribute("id")?.toString())}/>
                        <label htmlFor="oneStop">1 пересадка</label>
                    </div>
                    <div className={styles.filterRow}>
                        <input className={styles.filterCheckbox} type="checkbox" id="twoStops" checked={checkBoxChecked} onChange={e =>filterMake(e,e.target.getAttribute("id")?.toString())}/>
                        <label htmlFor="twoStops">2 пересадки</label>
                    </div>
                    <div className={styles.filterRow}>
                        <input className={styles.filterCheckbox} type="checkbox" id="threeStops" checked={checkBoxChecked} onChange={e =>filterMake(e,e.target.getAttribute("id")?.toString())}/>
                        <label htmlFor="threeStops">3 пересадки</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FilterLeft