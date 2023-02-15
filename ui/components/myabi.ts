const abi = {
  "source": {
    "hash": "0xce13afc0ebdabe51c4fc621566658bbd6694c7d757680996336beb48caf87f59",
    "language": "ink! 3.4.0",
    "compiler": "rustc 1.68.0-nightly"
  },
  "contract": {
    "name": "campaign",
    "version": "0.1.0",
    "authors": [
      "YasuYasu"
    ]
  },
  "V3": {
    "spec": {
      "constructors": [
        {
          "args": [
            {
              "label": "minimum",
              "type": {
                "displayName": [
                  "u128"
                ],
                "type": 3
              }
            }
          ],
          "docs": [],
          "label": "new",
          "payable": false,
          "selector": "0x9bae9d5e"
        }
      ],
      "docs": [
        "SPDX-License-Identifier: GPL-3.0"
      ],
      "events": [],
      "messages": [
        {
          "args": [],
          "docs": [
            " Simply returns the 'minimum' value."
          ],
          "label": "get_minimum",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "u128"
            ],
            "type": 3
          },
          "selector": "0x61328af9"
        },
        {
          "args": [],
          "docs": [
            " Simply return value."
          ],
          "label": "get_description",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "Option"
            ],
            "type": 6
          },
          "selector": "0x91cbb7bc"
        },
        {
          "args": [],
          "docs": [
            " Simply return value."
          ],
          "label": "get_value",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "u128"
            ],
            "type": 3
          },
          "selector": "0xca6f2170"
        },
        {
          "args": [],
          "docs": [
            " Simply return value."
          ],
          "label": "get_recipient",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "AccountId"
            ],
            "type": 0
          },
          "selector": "0x84b03732"
        },
        {
          "args": [],
          "docs": [
            " Simply return value."
          ],
          "label": "get_balance",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "u128"
            ],
            "type": 3
          },
          "selector": "0xea817e65"
        },
        {
          "args": [
            {
              "label": "description",
              "type": {
                "displayName": [
                  "Option"
                ],
                "type": 6
              }
            },
            {
              "label": "value",
              "type": {
                "displayName": [
                  "u128"
                ],
                "type": 3
              }
            },
            {
              "label": "recipient",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 0
              }
            }
          ],
          "docs": [],
          "label": "create_request",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 7
          },
          "selector": "0xa90550ab"
        },
        {
          "args": [],
          "docs": [],
          "label": "approve_request",
          "mutates": true,
          "payable": true,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 10
          },
          "selector": "0x463a3d58"
        },
        {
          "args": [],
          "docs": [],
          "label": "finalize_request",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 10
          },
          "selector": "0xf7227c67"
        }
      ]
    },
    "storage": {
      "struct": {
        "fields": [
          {
            "layout": {
              "cell": {
                "key": "0x0000000000000000000000000000000000000000000000000000000000000000",
                "ty": 0
              }
            },
            "name": "owner"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0100000000000000000000000000000000000000000000000000000000000000",
                "ty": 3
              }
            },
            "name": "minimum_contribution"
          },
          {
            "layout": {
              "enum": {
                "dispatchKey": "0x0200000000000000000000000000000000000000000000000000000000000000",
                "variants": {
                  "0": {
                    "fields": [
                      {
                        "layout": {
                          "cell": {
                            "key": "0x0300000000000000000000000000000000000000000000000000000000000000",
                            "ty": 4
                          }
                        },
                        "name": null
                      }
                    ]
                  },
                  "1": {
                    "fields": []
                  }
                }
              }
            },
            "name": "description"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0300000000000000000000000000000000000000000000000000000000000000",
                "ty": 3
              }
            },
            "name": "value"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0400000000000000000000000000000000000000000000000000000000000000",
                "ty": 0
              }
            },
            "name": "recipient"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0500000000000000000000000000000000000000000000000000000000000000",
                "ty": 5
              }
            },
            "name": "now_request"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0600000000000000000000000000000000000000000000000000000000000000",
                "ty": 3
              }
            },
            "name": "approval_count"
          }
        ]
      }
    },
    "types": [
      {
        "id": 0,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "type": 1,
                  "typeName": "[u8; 32]"
                }
              ]
            }
          },
          "path": [
            "ink_env",
            "types",
            "AccountId"
          ]
        }
      },
      {
        "id": 1,
        "type": {
          "def": {
            "array": {
              "len": 32,
              "type": 2
            }
          }
        }
      },
      {
        "id": 2,
        "type": {
          "def": {
            "primitive": "u8"
          }
        }
      },
      {
        "id": 3,
        "type": {
          "def": {
            "primitive": "u128"
          }
        }
      },
      {
        "id": 4,
        "type": {
          "def": {
            "sequence": {
              "type": 2
            }
          }
        }
      },
      {
        "id": 5,
        "type": {
          "def": {
            "primitive": "bool"
          }
        }
      },
      {
        "id": 6,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "None"
                },
                {
                  "fields": [
                    {
                      "type": 4
                    }
                  ],
                  "index": 1,
                  "name": "Some"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 4
            }
          ],
          "path": [
            "Option"
          ]
        }
      },
      {
        "id": 7,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 8
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 9
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 8
            },
            {
              "name": "E",
              "type": 9
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 8,
        "type": {
          "def": {
            "tuple": []
          }
        }
      },
      {
        "id": 9,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "CallerIsNotOwner"
                },
                {
                  "index": 1,
                  "name": "NewOwnerIsZero"
                }
              ]
            }
          },
          "path": [
            "openbrush_contracts",
            "traits",
            "errors",
            "ownable",
            "OwnableError"
          ]
        }
      },
      {
        "id": 10,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 8
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 11
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 8
            },
            {
              "name": "E",
              "type": 11
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 11,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 4,
                      "typeName": "String"
                    }
                  ],
                  "index": 0,
                  "name": "Custom"
                }
              ]
            }
          },
          "path": [
            "campaign",
            "campaign",
            "Error"
          ]
        }
      }
    ]
  }
};
export default abi;