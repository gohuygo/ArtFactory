pragma solidity ^0.4.15;

// ArtFactory
//
// The core contract that the client interacts with to register new Artists.
contract ArtFactory {

    struct Content{
        string videoUrl;
        string thumbnailUrl;
        string title;
        string description;
        uint128 price;
        address artist;
        mapping(address => bool) viewingAllowed;
    }

    struct Artist{
        string nickname;
        string email;
        address artistAddress;
    }

    address public owner;
    address[] public artists;
    mapping(address => Artist) public artistMapping;
    mapping(address => bool) public signedUp;
    mapping(address => Content[]) public artistContents;
    mapping(address => uint) public balances;

    modifier notSignedUp {
        require(!signedUp[msg.sender]);
        _;
    }

    constructor () public {
        owner = msg.sender;
    }

    // CreateArtist       Create a new Artist struct and update state variables
    // @param _nickname   The nickname of the Artist
    // @param _email      The email of the artist
    //
    // @return bool       Returns true if successful
    function createArtist(string _nickname, string _email) public notSignedUp returns (bool){
        Artist memory artist = Artist(_nickname, _email, msg.sender);
        // Might be unnecessary to store an array of Artists unless we want to
        // list some of these artists on the client
        artists.push(msg.sender);

        // Set the address as signed up
        artistMapping[msg.sender] = artist;

        return true;
    }

    // CreateContent         Create a new Content struct and update state variables
    // @param _videoUrl      The IPFS url of the video
    // @param _thumbnailUrl  The IPFS url of the thumbnail
    // @param _title         The content title
    // @param _description   The content description
    // @param _price         The price that supporters will have to pay to access the content
    //
    // @return bool          Returns true if successful
    function createContent(
        string _videoUrl,
        string _thumbnailUrl,
        string _title,
        string _description,
        uint128 _price)
        public returns (bool) {
            Content memory content = Content(_videoUrl, _thumbnailUrl, _title, _description, _price, address(this));
            // Store the content in an array so we can access all of an artist's content
            artistContents[msg.sender].push(content);

            return true;
    }
    // TODO: Implement the following
    //function viewBalance()
    //function withdraw()
}



