<script>

    import boardingpass from '../../../utils/parse-boardingpass.js';

    export let value;

    let result = boardingpass.parse(value);

</script>

{#if result}
    {#each result as boardingpass}
        <div class='leg'>
            <div class='carrier'>
                <img class='operatingCarrierLogo' src='https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/${boardingpass.carrier}.svg' alt=''>
            </div>
            <div class='airport'>
                <div class='departureAirport'>{boardingpass.departureAirport}</div> 
                <div class='airportSeperator'>✈</div> 
                <div class='arrivalAirport'>{boardingpass.arrivalAirport}</div>
            </div>
            <div class='details'>
                <div class='passenger'><b>Passenger</b><br>{boardingpass.passengerName}</div>
                <div class='booking'><b>Booking</b><br>{boardingpass.pnr}</div>
                {#if boardingpass.class}
                    <div class='compartmentCode'><b>Class</b><br>{boardingpass.class}</div>
                {/if}
                <div class='seatNumber'><b>Seat</b><br>{boardingpass.seat}</div>
            </div>
            <div class='details'>
                <div class='flightNumber'><b>Flight</b><br>{boardingpass.carrier}{boardingpass.flightNumber}</div>
                <div class='flightDate'><b>Date</b><br>{boardingpass.flightDate}</div>
                <div class='flightTime'><b>Departure</b><br>{boardingpass.flightTime}</div>
                <div class='checkInSequenceNumber'><b>Sequence</b><br>{boardingpass.sequence}</div>
            </div>
        </div>
    {/each}
{/if}

<style>

    .leg {
        background: #eee;
        border-radius: 6px;
        padding: 20px 50px;
        margin: 30px 0 20px;
        font-family: system-ui;
    }

    .leg .carrier {
        display: flex;
        justify-content: center;
        margin-bottom: 16px;
    }

    .leg .operatingCarrierLogo {
        max-height: 30px;
    }

    .leg .airport {
        font-size: 3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .leg .departureAirport {
        color: #aaa;
    }

    .leg .airportSeperator {
        color: #333;
        font-family: sans-serif;
        font-size: 1.3em;
    }

    .leg .arrivalAirport {
        color: #aaa;
    }

    .leg .details {
        margin-top: 16px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        text-align: center;     
        color: #333;           
    }

    .leg .details b {
        text-transform: uppercase;
        font-size: 0.8em;
        line-height: 180%;
    }

</style>