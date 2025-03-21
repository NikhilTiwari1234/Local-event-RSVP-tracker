const contractAddress = "0x913772326D29B424E15211C7c25E896369894Fe0";
const abi = [
    [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "eventId",
                    "type": "uint256"
                }
            ],
            "name": "EventCancelled",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "eventId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "organizer",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "date",
                    "type": "uint256"
                }
            ],
            "name": "EventCreated",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "eventId",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "attendee",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "tickets",
                    "type": "uint256"
                }
            ],
            "name": "TicketPurchased",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "attendees",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "isAttending",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "ticketsBought",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_eventId",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_quantity",
                    "type": "uint256"
                }
            ],
            "name": "buyTicket",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_eventId",
                    "type": "uint256"
                }
            ],
            "name": "cancelEvent",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "_eventId",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "_attendee",
                    "type": "address"
                }
            ],
            "name": "checkAttendance",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "attending",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "tickets",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "_name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "_description",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "_date",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_ticketPrice",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "_totalTickets",
                    "type": "uint256"
                }
            ],
            "name": "createEvent",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "eventCount",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "events",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "description",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "date",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "organizer",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "ticketPrice",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "totalTickets",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "ticketsSold",
                    "type": "uint256"
                },
                {
                    "internalType": "bool",
                    "name": "isActive",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]
];

let web3;
let contract;

async function init() {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3.eth.getAccounts();
        contract = new web3.eth.Contract(abi, contractAddress);
        console.log("Connected to contract:", contract);
    } else {
        alert("Please install MetaMask to use this app.");
    }
}

async function createEvent() {
    const name = document.getElementById("eventName").value;
    const description = document.getElementById("eventDescription").value;
    const date = new Date(document.getElementById("eventDate").value).getTime() / 1000;
    const ticketPrice = document.getElementById("ticketPrice").value;
    const totalTickets = document.getElementById("totalTickets").value;

    try {
        const accounts = await web3.eth.getAccounts();
        await contract.methods.createEvent(name, description, date, ticketPrice, totalTickets)
            .send({ from: accounts[0] });

        alert("Event created successfully!");
    } catch (error) {
        console.error(error);
        alert("Error creating event.");
    }
}

async function buyTicket() {
    const eventId = document.getElementById("eventIdBuy").value;
    const quantity = document.getElementById("ticketQuantity").value;

    try {
        const accounts = await web3.eth.getAccounts();
        const ticketPrice = await contract.methods.events(eventId).call().then(event => event.ticketPrice);
        const totalCost = ticketPrice * quantity;

        await contract.methods.buyTicket(eventId, quantity)
            .send({ from: accounts[0], value: totalCost });

        alert("Ticket purchased successfully!");
    } catch (error) {
        console.error(error);
        alert("Error buying ticket.");
    }
}

async function fetchEvents() {
    document.getElementById("eventsList").innerHTML = "";
    const totalEvents = await contract.methods.eventCount().call();

    for (let i = 1; i <= totalEvents; i++) {
        const event = await contract.methods.events(i).call();
        if (event.isActive) {
            document.getElementById("eventsList").innerHTML += `
                <div>
                    <h3>${event.name}</h3>
                    <p>${event.description}</p>
                    <p>Date: ${new Date(event.date * 1000).toLocaleString()}</p>
                    <p>Tickets Available: ${event.totalTickets - event.ticketsSold}</p>
                    <p>Price: ${web3.utils.fromWei(event.ticketPrice, "ether")} ETH</p>
                    <hr>
                </div>
            `;
        }
    }
}

window.onload = init;
