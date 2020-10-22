import React, {useEffect, useState} from 'react'
import axios from "axios"

import styles from './Tickets.module.sass'
import TicketDetail from "../ticket";

let TICKETS = []
function TicketsList() {

    const [tickets, setTickets] = useState([])
    const [searchId, setSearchId] = useState('')
    const [exception, setException] = useState('')
    const [loading, setLoading] = useState(true)
    const [filter, setFilterValue] = useState()
    const [checkBoxChecked, setCheckBoxChecked] = useState(false)

    useEffect( () => {
        axios.get('https://front-test.beta.aviasales.ru/search')
            .then(res => {
                getTickets(res?.data?.searchId)
            })
            .catch( (error) => {
                console.log(error)
            })
    },[])

    const getTickets = (searchIdNum) => {

        if(!searchIdNum)   return false
        setSearchId(searchIdNum)

        axios.get('https://front-test.beta.aviasales.ru/tickets?searchId=' + searchIdNum)
            .then(res=> {
                if( res?.data?.tickets ) {
                    TICKETS = res?.data?.tickets
                    setTickets( res?.data?.tickets )
                    console.log("49 TICKETS")
                    console.log(TICKETS)
                }
                setLoading(false)
            })
            .catch( (error) => {
                console.log(error)
                setException(error.message)
                setTickets([])
            })
    }

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
            console.log("160 TICKETS")
            console.log(TICKETS)
            // @ts-ignore
            let filteredTickets = TICKETS.filter(
                ticket => ticket.segments.some
                ( (segment) => segment.stops.length === stopsCount)
            )

            setTickets(filteredTickets)
        } else {
            setTickets(TICKETS)
        }
    }

    return (
        <div>
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

            {exception
                ?
                <div className={styles.ticketsContainer}>Нет данных с сервера</div>
                :
                <div className={styles.ticketsContainer}>
                    <div className={styles.ticketTypeCheckers}>
                        <div className={styles.ticketTypeCheckerChecked}>
                            <div className={styles.ticketTypeCheckerText}>Самый дешевый</div>
                        </div>
                        <div className={styles.ticketTypeChecker}>
                            <div className={styles.ticketTypeCheckerText}>Самый быстрый</div>
                        </div>
                    </div>
                    {tickets ?
                        tickets.map((ticket) =>
                            <TicketDetail {...ticket} key={Math.random()}/>
                        )
                        :
                        <div>Билетов нет</div>
                    }
                </div>
            }
        </div>
    )
}

export default TicketsList
