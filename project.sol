// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LocalEventRSVP {
    struct Event {
        string name;
        string description;
        uint256 date;
        address organizer;
        uint256 ticketPrice;
        uint256 totalTickets;
        uint256 ticketsSold;
        bool isActive;
    }

    struct Attendee {
        bool isAttending;
        uint256 ticketsBought;
    }

    mapping(uint256 => Event) public events;
    mapping(uint256 => mapping(address => Attendee)) public attendees;
    
    uint256 public eventCount;

    event EventCreated(uint256 eventId, string name, address organizer, uint256 date);
    event TicketPurchased(uint256 eventId, address attendee, uint256 tickets);
    event EventCancelled(uint256 eventId);

    modifier onlyOrganizer(uint256 eventId) {
        require(msg.sender == events[eventId].organizer, "Not the event organizer");
        _;
    }

    function createEvent(
        string memory _name,
        string memory _description,
        uint256 _date,
        uint256 _ticketPrice,
        uint256 _totalTickets
    ) public {
        require(_date > block.timestamp, "Invalid event date");
        require(_totalTickets > 0, "Tickets must be greater than zero");

        eventCount++;
        events[eventCount] = Event(_name, _description, _date, msg.sender, _ticketPrice, _totalTickets, 0, true);

        emit EventCreated(eventCount, _name, msg.sender, _date);
    }

    function buyTicket(uint256 _eventId, uint256 _quantity) public payable {
        Event storage eventInfo = events[_eventId];
        require(eventInfo.isActive, "Event is not active");
        require(block.timestamp < eventInfo.date, "Event has ended");
        require(eventInfo.ticketsSold + _quantity <= eventInfo.totalTickets, "Not enough tickets");
        require(msg.value >= eventInfo.ticketPrice * _quantity, "Insufficient payment");

        attendees[_eventId][msg.sender].isAttending = true;
        attendees[_eventId][msg.sender].ticketsBought += _quantity;
        eventInfo.ticketsSold += _quantity;

        emit TicketPurchased(_eventId, msg.sender, _quantity);
    }

    function cancelEvent(uint256 _eventId) public onlyOrganizer(_eventId) {
        require(events[_eventId].isActive, "Event is already canceled");
        events[_eventId].isActive = false;
        emit EventCancelled(_eventId);
    }

    function checkAttendance(uint256 _eventId, address _attendee) public view returns (bool attending, uint256 tickets) {
        Attendee storage attendee = attendees[_eventId][_attendee];
        return (attendee.isAttending, attendee.ticketsBought);
    }
}
