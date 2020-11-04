import React, {useEffect, useState} from 'react'
import styles from './FilterRow.module.sass'

function FilterRow(props ) {

    let {   id,
            text,
            makefilterTickets,
            ticketsIntitial,
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
                ticket => ticket.segments.every
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
            <div className={styles.filterRow}>
                <input className={styles.filterCheckbox} type="checkbox" id={id} checked={checkBoxChecked} onChange={e =>filterMake(e,e.target.getAttribute("id")?.toString())} />
                <div className={styles.filterCheckBoxLabelDiv}>
                    <label htmlFor={id}>{text}</label>
                </div>
            </div>
        </>
    )
}

export default FilterRow