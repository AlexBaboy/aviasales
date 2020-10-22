import React, {useEffect, useState} from 'react'
import axios from "axios"

import styles from './Tickets.module.sass'
import TicketDetail from "../ticket";
import FilterLeft from "../filters/left";

let TICKETS = []
function TicketsList(props) {

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
                }
                setLoading(false)
            })
            .catch( (error) => {
                setException(error.message)
                setTickets([])
            })
    }

    const makefilterTickets = (filteredTickets) => {
        setTickets(filteredTickets)
    }

    return (
        <div>

            <FilterLeft ticketsIntitial={TICKETS} makefilterTickets={makefilterTickets} />

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
