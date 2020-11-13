import React, {useEffect, useState} from 'react'
import axios from "axios"

import styles from './Tickets.module.sass'
import TicketDetail from "../ticket";
import FilterLeft from "../filters/left";

function TicketsList(props) {

    const [tickets, setTickets] = useState([])
    const [searchId, setSearchId] = useState('')
    const [exception, setException] = useState('')
    const [loading, setLoading] = useState(true)
    const [ticketsInitial, setTicketsInitial] = useState([])

    useEffect( () => {
        setLoading(true)
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

                    setTicketsInitial(res?.data?.tickets)

                    console.log("res?.data?.tickets")
                    console.log(res?.data?.tickets)


                    console.log("ticketsInitial")
                    console.log(ticketsInitial)
                }
                setLoading(false)
            })
            .catch( (error) => {
                setException(error.message)
                setTickets([])
                setLoading(false)
            })
    }

    useEffect( ()=> {

        // сразу сортируем по полю цена - по возрастанию!!!
        const sortedTickets = ticketsInitial.sort((a,b) => a.price - b.price);
        setTickets(sortedTickets)

    }, [ticketsInitial])

    const makefilterTickets = (filteredTickets) => {

        // сотировка по цене - по возрастанию !!!
        const sortedTickets = filteredTickets.sort((a,b) => a.price - b.price);
        setTickets(sortedTickets)
    }

    if(exception) return <div className={styles.ticketsContainerRoot}>Нет данных с сервера</div>
    if(loading) return <div className={styles.ticketsContainerRoot}>идет загрузка...</div>

    return (

        ticketsInitial ?

            <div className={styles.ticketsContainerRoot}>

                <FilterLeft ticketsIntitial={ticketsInitial} makefilterTickets={makefilterTickets} />

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
                                <TicketDetail {...ticket} key={
                                                                ticket.segments[0].date +
                                                                ticket.segments[0].destination +
                                                                ticket.segments[0].duration +
                                                                ticket.segments[0].origin } />
                            )
                            :
                            <div>Билетов нет</div>
                        }
                    </div>
            </div>
        : ""
    )
}

export default TicketsList
