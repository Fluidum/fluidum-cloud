export const abi =  [
    {
        "inputs": [
            {
                "internalType": "contract ISuperfluid",
                "name": "host",
                "type": "address"
            },
            {
                "internalType": "contract IConstantFlowAgreementV1",
                "name": "cfa",
                "type": "address"
            },
            {
                "internalType": "contract ISuperToken",
                "name": "acceptedToken",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "_acceptedToken",
        "outputs": [
            {
                "internalType": "contract ISuperToken",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract ISuperToken",
                "name": "_superToken",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_agreementClass",
                "type": "address"
            },
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            },
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            },
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            },
            {
                "internalType": "bytes",
                "name": "_ctx",
                "type": "bytes"
            }
        ],
        "name": "afterAgreementCreated",
        "outputs": [
            {
                "internalType": "bytes",
                "name": "newCtx",
                "type": "bytes"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract ISuperToken",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            },
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            },
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            },
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            }
        ],
        "name": "afterAgreementTerminated",
        "outputs": [
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract ISuperToken",
                "name": "_superToken",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_agreementClass",
                "type": "address"
            },
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            },
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            },
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            },
            {
                "internalType": "bytes",
                "name": "_ctx",
                "type": "bytes"
            }
        ],
        "name": "afterAgreementUpdated",
        "outputs": [
            {
                "internalType": "bytes",
                "name": "newCtx",
                "type": "bytes"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract ISuperToken",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            },
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            },
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            }
        ],
        "name": "beforeAgreementCreated",
        "outputs": [
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract ISuperToken",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            },
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            },
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            }
        ],
        "name": "beforeAgreementTerminated",
        "outputs": [
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "contract ISuperToken",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "bytes32",
                "name": "",
                "type": "bytes32"
            },
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            },
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            }
        ],
        "name": "beforeAgreementUpdated",
        "outputs": [
            {
                "internalType": "bytes",
                "name": "",
                "type": "bytes"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "addressToCheck",
                "type": "address"
            }
        ],
        "name": "checkRegistered",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "code",
                "type": "string"
            },
            {
                "internalType": "bytes32",
                "name": "phoneNumberHash",
                "type": "bytes32"
            }
        ],
        "name": "finishVerification",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newUserAddress",
                "type": "address"
            },
            {
                "internalType": "bytes32",
                "name": "phoneNumberHash",
                "type": "bytes32"
            }
        ],
        "name": "mockRegistration",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newUserAddress",
                "type": "address"
            },
            {
                "internalType": "bytes32",
                "name": "codeHash",
                "type": "bytes32"
            },
            {
                "internalType": "bytes32",
                "name": "phoneNumberHash",
                "type": "bytes32"
            }
        ],
        "name": "startVerification",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];