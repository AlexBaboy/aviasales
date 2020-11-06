import React, {useEffect, useState} from 'react'
import styles from './FilterRow.module.sass'

function FilterRow(props ) {

    let {   id,
            text,
            makefilterTickets,
            ticketsIntitial,
        } = props

    const [idChecked, setIdChecked] = useState("all")

    const filterMake = ( event ) => {

        const checked = event.target.checked
        const type = event.target.getAttribute("id")

        console.log("19 checked = " + checked)

        if(checked)
            setIdChecked(type)
        else
            console.log("unchecked!")
            setIdChecked()

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

    useEffect( ()=> {

    })

    const checkBoxChecked =( id ) => {

        if(id != idChecked)
            return false
        else
            return true
    }

    return (
        <>
            <div className={styles.filterRow}>
                <input className={styles.filterCheckbox} type="checkbox" id={id} checked={checkBoxChecked(id)} onChange={e =>filterMake(e)} />
                <div className={styles.filterCheckBoxLabelDiv}>
                    <label htmlFor={id}>{text}</label>
                </div>
            </div>
        </>
    )
}

export default FilterRow