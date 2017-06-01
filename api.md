Displaying additional fields - for linked Google Accounts

There are additional fields in the account object that can be used to show an user's identity. Note that this account here does not have the typical username, email fields:
GET - https://accounts.qor.io/v1/account/54c35f05-6e4b-11e5-9f7f-0295f5843583
returns
{
    "id": "54c35f05-6e4b-11e5-9f7f-0295f5843583",
    "created_timestamp": 1444370552,
    "services": [
        {
            "id": "passport",
            "account_id": "54c35f05-6e4b-11e5-9f7f-0295f5843583",
            "scopes": [
                "my_account"
            ],
            "start_timestamp": 1444370552
        },
        {
            "id": "app1",
            "account_id": "54c35f05-6e4b-11e5-9f7f-0295f5843583",
            "scopes": [
                "app1-readonly",
                "app1-write"
            ],
            "start_timestamp": 1444370552
        },
        {
            "id": "app2",
            "account_id": "54c35f05-6e4b-11e5-9f7f-0295f5843583",
            "scopes": [
                "app2-readonly"
            ],
            "start_timestamp": 1444370552
        }
    ],
    "primary": {
        "domain": "qor.io",
        "id": "54c35f05-6e4b-11e5-9f7f-0295f5843583",
        "oauth2_provider": "google.com",
        "oauth2_account_id": "davidc616@gmail.com"
    },
    "custom_json": ""
}


When the option Packages is selected, call this API:

GET /v1/pkg/{domain_class}
GET - https://ops-dev.blinker.com/v1/pkg/blinker.com/
which returns

{
    "blinker": {
        "domain": "blinker.com",
        "service": "blinker",
        "instances": [
            "sandbox",
            "integration",
            "staging",
            "production"
        ],
        "versions": [
            "master",
            "integration",
            "staging",
            "production"
        ],
        "live": {
            "integration": {
                "docker_image": "blinker/blinker:integration-123333"
            },
            "production": {
                "docker_image": "blinker/blinker:production-v1.1"
            },
            "sandbox": {
                "docker_image": "blinker/blinker:master-12234"
            },
            "staging": {
                "docker_image": "blinker/blinker:staging-v1.2"
            }
        }
    },
    "clockwork": {
        "domain": "blinker.com",
        "service": "clockwork",
        "instances": [
            "sandbox",
            "integration",
            "staging",
            "production"
        ],
        "versions": [
            "master",
            "sandbox",
            "integration",
            "staging",
            "latest",
            "production",
            "develop"
        ],
        "live": {}
    },
    "dash": {
        "domain": "blinker.com",
        "service": "dash",
        "instances": [
            "integration"
        ],
        "versions": [],
        "live": {}
    },
    "memcached": {
        "domain": "blinker.com",
        "service": "memcached",
        "instances": [
            "sandbox",
            "integration",
            "staging",
            "production"
        ],
        "versions": [
            "v1.0.3",
            "release"
        ],
        "live": {}
    },
    "mqtt": {
        "domain": "blinker.com",
        "service": "mqtt",
        "instances": [
            "production",
            "sandbox",
            "integration",
            "staging"
        ],
        "versions": [
            "130"
        ],
        "live": {}
    },
    "nginx": {
        "domain": "blinker.com",
        "service": "nginx",
        "instances": [
            "sandbox",
            "integration",
            "production"
        ],
        "versions": [
            "latest",
            "v0.5.5",
            "v0.2.6",
            "v0.5.6"
        ],
        "live": {}
    },
    "sidekiq": {
        "domain": "blinker.com",
        "service": "sidekiq",
        "instances": [
            "sandbox",
            "integration",
            "staging",
            "production"
        ],
        "versions": [
            "develop",
            "latest",
            "master",
            "sandbox",
            "integration",
            "staging",
            "production"
        ],
        "live": {}
    },
    "valet": {
        "domain": "blinker.com",
        "service": "valet",
        "instances": [
            "sandbox",
            "integration",
            "staging",
            "production"
        ],
        "versions": [],
        "live": {}
    },
    "vdp": {
        "domain": "blinker.com",
        "service": "vdp",
        "instances": [
            "integration"
        ],
        "versions": [
            "master"
        ],
        "live": {}
    }
}


The backend now has new endpoints that can proxy HTTP / REST calls to the Docker daemon running on the target host. This has the form:

GET - /v1/dockerapi/{domain_class}/{domain_instance}/{target}/{the-docker-remote-api-endpoint}
For example, the Remote API call to get info: GET - /info (https://docs.docker.com/reference/api/docker_remote_api_v1.18/#display-system-wide-information)
will be instead like this, for a target 10.31.41.127 in dev of blinker.com:

GET - https://ops-dev.blinker.com/v1/dockerapi/blinker.com/dev/10.31.41.127/info
Returns

{
    "Containers": 5,
    "Debug": 0,
    "DockerRootDir": "/var/lib/docker",
    "Driver": "devicemapper",
    "DriverStatus": [
        [
            "Pool Name",
            "docker-202:1-524929-pool"
        ],
        [
            "Pool Blocksize",
            "65.54 kB"
        ],
        [
            "Backing Filesystem",
            "extfs"
        ],
        [
            "Data file",
            "/dev/loop0"
        ],
        [
            "Metadata file",
            "/dev/loop1"
        ],
        [
            "Data Space Used",
            "4.253 GB"
        ],
        [
            "Data Space Total",
            "107.4 GB"
        ],
        [
            "Data Space Available",
            "59.05 GB"
        ],
        [
            "Metadata Space Used",
            "7.533 MB"
        ],
        [
            "Metadata Space Total",
            "2.147 GB"
        ],
        [
            "Metadata Space Available",
            "2.14 GB"
        ],
        [
            "Udev Sync Supported",
            "false"
        ],
        [
            "Data loop file",
            "/var/lib/docker/devicemapper/devicemapper/data"
        ],
        [
            "Metadata loop file",
            "/var/lib/docker/devicemapper/devicemapper/metadata"
        ],
        [
            "Library Version",
            "1.02.82-git (2013-10-04)"
        ]
    ],
    "ExecutionDriver": "native-0.2",
    "ID": "6CWC:72GK:UNDO:5PQJ:UODF:LYII:A4FS:DLNQ:6IEK:PISO:N25K:TKSB",
    "IPv4Forwarding": 1,
    "Images": 168,
    "IndexServerAddress": "https://index.docker.io/v1/",
    "InitPath": "/usr/bin/docker",
    "InitSha1": "7f9c6798b022e64f04d2aff8c75cbf38a2779493",
    "KernelVersion": "3.13.0-36-generic",
    "Labels": null,
    "MemTotal": 2097610752,
    "MemoryLimit": 1,
    "NCPU": 1,
    "NEventsListener": 1,
    "NFd": 38,
    "NGoroutines": 68,
    "Name": "ip-10-31-41-127",
    "OperatingSystem": "Ubuntu 14.04.1 LTS",
    "RegistryConfig": {
        "IndexConfigs": {
            "docker.io": {
                "Mirrors": null,
                "Name": "docker.io",
                "Official": true,
                "Secure": true
            }
        },
        "InsecureRegistryCIDRs": [
            "127.0.0.0/8"
        ]
    },
    "SwapLimit": 0,
    "SystemTime": "2015-09-09T06:05:26.598409967Z"
}

This call is also authenticated -- please include the token header.

For example: selecting the Blinker API and then the dev instance:

GET - https://ops-dev.blinker.com/v1/dockerapi/blinker.com/dev/
This will return

{
  "10.31.41.127": {
    "api": "10.31.41.127:25657",
    "dockerapi": "http://10.31.41.127:25658/dockerapi",
    "version": {
      "Branch": "v1.0",
      "BuildLabel": "-extld=gcc",
      "Commit": "566f3ff89b605407b9be1cef337c4a606195ffe2",
      "Message": "",
      "Number": "",
      "RepoUrl": "git@github.com:infradash&dash.git",
      "Tag": "release-1.2",
      "Timestamp": "2015-09-08-15:25"
    }
  },
  "10.31.80.203": {
    "api": "10.31.80.203:25657",
    "dockerapi": "http://10.31.80.203:25658/dockerapi",
    "version": {
      "Branch": "v1.0",
      "BuildLabel": "-extld=gcc",
      "Commit": "566f3ff89b605407b9be1cef337c4a606195ffe2",
      "Message": "",
      "Number": "",
      "RepoUrl": "git@github.com:infradash&dash.git",
      "Tag": "release-1.2",
      "Timestamp": "2015-09-08-15:25"
    }
  }
}

When the user selects the L1 menu Accounts, navigate to this screen. In this screen, present a list of user accounts

GET - https://accounts.qor.io/v1/account/
Content-Type: application/json
Authorization: Bearer {{USE THE VALUE OF THE TOKEN FROM THE SDK AUTH CALL}}
Returns

[
    {
        "id": "1230e852-4c55-11e5-af87-0242ac11000e",
        "created_timestamp": 1440636396,
        "services": [
            {
                "id": "passport",
                "account_id": "1230e852-4c55-11e5-af87-0242ac11000e",
                "scopes": [
                    "my_account"
                ],
                "start_timestamp": 1440636396
            },
            {
                "id": "dashboard-admin",
                "account_id": "1230e852-4c55-11e5-af87-0242ac11000e",
                "scopes": [
                    "env-admin",
                    "env-update",
                    "env-readonly",
                    "conf-admin",
                    "conf-update",
                    "conf-readonly",
                    "pkg-admin",
                    "pkg-update",
                    "pkg-readonly",
                    "registry-admin",
                    "registry-update",
                    "registry-readonly",
                    "domain-readonly",
                    "orchestrate-start",
                    "orchestrate-readonly",
                    "orchestrate-model-admin",
                    "orchestrate-model-update",
                    "orchestrate-model-readonly",
                    "live-version-update",
                    "live-version-readonly"
                ],
                "start_timestamp": 1440636396
            },
            {
                "id": "dashboard",
                "account_id": "1230e852-4c55-11e5-af87-0242ac11000e",
                "scopes": [
                    "env-readonly",
                    "conf-readonly",
                    "pkg-readonly",
                    "registry-readonly",
                    "domain-readonly",
                    "orchestrate-readonly",
                    "orchestrate-model-readonly",
                    "live-version-readonly"
                ],
                "start_timestamp": 1440636396
            }
        ],
        "primary": {
            "domain": "qor.io",
            "id": "1230e852-4c55-11e5-af87-0242ac11000e",
            "password": "JDJhJDEwJHZna2xDQUpMVVZ3Y3ZiOEtzRzBpbU9XQWE4QTREb0oveGZSQURXb0hlQW1PbTVmUUkzVG9X",
            "username": "dashboard-admin2"
        },
        "custom_json": "{ \\\n        \"name\":\"dashboard-user\" \\\n    }"
    },
    {
        "id": "77a9d0d3-f4fc-11e4-9997-0242ac11000a",
        "created_timestamp": 1431032590,
        "services": [
            {
                "id": "passport",
                "account_id": "77a9d0d3-f4fc-11e4-9997-0242ac11000a",
                "scopes": [
                    "my_account",
                    "account_update",
                    "passport_admin",
                    "account_readonly"
                ]
            },
            {
                "id": "app1",
                "account_id": "77a9d0d3-f4fc-11e4-9997-0242ac11000a",
                "scopes": [
                    "app1-readonly",
                    "app1-write"
                ],
                "start_timestamp": 1431032590
            },
            {
                "id": "app2",
                "account_id": "77a9d0d3-f4fc-11e4-9997-0242ac11000a",
                "scopes": [
                    "app2-readonly"
                ],
                "start_timestamp": 1431032590
            }
        ],
        "primary": {
            "domain": "qor.io",
            "id": "77a9d0d3-f4fc-11e4-9997-0242ac11000a",
            "password": "JDJhJDEwJGNsUHZOQ2NNYml6UlJwdzJCdGdqTGVYRGRBdEJtaFFMek5BNFRFcGM5ZjBTVGhublZHdEhT",
            "username": "dashboard-admin"
        },
        "custom_json": "{ \\\n        \"name\":\"dashboard-admin\",\\\n        \"role\" : \"supervisors\"\\\n    }"
    },
    {
        "id": "a701e721-f4f7-11e4-9997-0242ac11000a",
        "created_timestamp": 1431030522,
        "services": [
            {
                "id": "passport",
                "scopes": [
                    "my_account",
                    "account_readonly"
                ]
            },
            {
                "id": "app1",
                "account_id": "a701e721-f4f7-11e4-9997-0242ac11000a",
                "scopes": [
                    "app1-readonly",
                    "app1-write",
                    "app1-superuser",
                    "can-tell-jokes"
                ]
            },
            {
                "id": "app2",
                "account_id": "a701e721-f4f7-11e4-9997-0242ac11000a",
                "scopes": [
                    "app2-readonly"
                ],
                "start_timestamp": 1431030522
            }
        ],
        "primary": {
            "domain": "qor.io",
            "id": "a701e721-f4f7-11e4-9997-0242ac11000a",
            "password": "JDJhJDEwJGsud2tNWi9GV3BVemJYamtEWFNybXVJbDd1ZHEwUDM3QUVMdWM4UmM2RUZrbWR4MnpCSnE2",
            "username": "dashboard1"
        },
        "custom_json": "{ \\\n        \"name\":\"dashboard1\",\\\n        \"role\" : \"operations\"\\\n    }"
    }
]

L1 menu - Domain Class

This shows the list of domain_class. In our example, it's blinker.com or blinker API.

L2 menu - Services

At this level, the user should see a list of services. To obtain the list of services, use the GET domain API:

GET - /v1/domain/{domain_class}
For example,

https://ops-dev.blinker.com/v1/domain/blinker.com
returns

{
  "id": "blinker.com",
  "class": "blinker.com",
  "name": "blinker API",
  "url": "/v1/domain/blinker.com/",
  "instances": [
    "dev",
    "staging",
    "production"
  ],
  "services": [
    "blinker"
  ]
}

GET - /v1/conf/{domain_class}/
The returns a structure similar to the ENV calls: there is an array of domain_instances and versions. In addition, there is an array of objects. Each object is a config file used in some way by a service.
For example:

{
  "blinker": {
    "domain": "blinker.com",
    "service": "blinker",
    "instances": [
      "production",
      "dev",
      "staging"
    ],
    "objects": [
      "nginx.conf"
    ],
    "versions": [
      "PtD",
      "STtoDEV2",
      "DD1",
      "PRODN",
      "DEVtPROD1",
      "develop",
      "new",
      "DEVtoPROD3",
      "DEVtoPROD2",
      "v1.2",
      "DtP",
      "DW",
      "STtoDEV",
      "v1.1",
      "DP1"
    ],
    "live": {
      "dev": {
        "nginx.conf": "v1.2"
      },
      "production": {
        "nginx.conf": "v1.1"
      },
      "staging": {
        "nginx.conf": "v1.1"
      }
    }
  }
}

This is populated by the call

GET https://ops-dev.blinker.com/v1/env/blinker.com/
Note the change in #81 the response should be

{
  "blinker": {
    "domain": "blinker.com",
    "service": "blinker",
    "instances": [
      "dev",
      "staging",
      "production"
    ],
    "versions": [
      "v1.2",
      "develop",
      "v1.1"
    ],
    "live": {
      "dev": "develop",
      "production": "v1.1",
      "staging": "v1.1"
    }
  }
}


The API to retrieve metadata about a service's environment variables

GET - /v1/env/{domain_class}/
was previously returning an array, like this:

GET https://ops-dev.blinker.com/v1/env/blinker.com/
returns

[
  {
    "domain": "blinker.com",
    "service": "blinker",
    "instances": [
      "dev",
      "staging",
      "production"
    ],
    "versions": [
      "v1.1",
      "v1.2",
      "develop"
    ],
    "live": {
      "dev": "develop",
      "production": "v1.1",
      "staging": "v1.1"
    }
  }
]
This has now changed to returning a dictionary where the key is the name of the service:

{
  "blinker": {
    "domain": "blinker.com",
    "service": "blinker",
    "instances": [
      "production",
      "dev",
      "staging"
    ],
    "versions": [
      "v1.2",
      "develop",
      "v1.1"
    ],
    "live": {
      "dev": "develop",
      "production": "v1.1",
      "staging": "v1.1"
    }
  }
}


API to call

** ALL CALLS REQUIRE THE AUTH TOKEN **

GET - https://ops-dev.blinker.com/v1/orchestrate/{domain_class}/{domain_instance}/{orchestration_name}/
The parameters are the same as when you start an orchestration. See #73

Example:

GET - https://ops-dev.blinker.com/v1/orchestrate/blinker.com/production/provision_instance/
Returns

[
  {
    "domain": "production.blinker.com",
    "id": "eeada0c5-39b1-11e5-93c0-0295f5843583",
    "name": "provision_instance",
    "start_time": "2015-08-03T07:33:28.101913816Z",
    "completion_time": "0001-01-01T00:00:00Z",
    "status": "Started",
    "user": "Dash",
    "note": "This is a test2."
  },
  {
    "domain": "production.blinker.com",
    "id": "ef5e1d74-39b1-11e5-93c0-0295f5843583",
    "name": "provision_instance",
    "start_time": "2015-08-03T07:33:29.258539698Z",
    "completion_time": "0001-01-01T00:00:00Z",
    "status": "Started",
    "user": "Dash",
    "note": "This is a test2."
  },
  {
    "domain": "production.blinker.com",
    "id": "f029611a-39b1-11e5-93c0-0295f5843583",
    "name": "provision_instance",
    "start_time": "2015-08-03T07:33:30.590670328Z",
    "completion_time": "0001-01-01T00:00:00Z",
    "status": "Started",
    "user": "Dash",
    "note": "This is a test2."
  }
]


### List orchestrations:
GET https://ops-dev.blinker.com/v1/orchestrate/{domain_class}/{domain_instance}/
Don't forget the trailing /.

For example:

https://ops-dev.blinker.com/v1/orchestrate/blinker.com/production/
returns

[
  {
    "name": "blinker_build_image",
    "label": "Build Docker image (blinker)",
    "description": "Build docker image for blinker service",
    "activate_url": "/v1/orchestrate/production.blinker.com/blinker_build_image",
    "default_input": {
      "git_branch": "develop",
      "git_repo": "git@github.com:BlinkerGit/test.git",
      "git_tag": "release1.0"
    }
  },
  {
    "name": "blinker_db_migrate",
    "label": "Run db migration (blinker)",
    "description": "Run database migration for blinker",
    "activate_url": "/v1/orchestrate/production.blinker.com/blinker_db_migrate",
    "default_input": {
      "retry": false
    }
  },
  {
    "name": "provision_instance",
    "label": "Provision minion instances",
    "description": "Starts new minion instance and add to the pool for a given environment",
    "activate_url": "/v1/orchestrate/production.blinker.com/provision_instance",
    "default_input": {
      "image": "aws-ami-1234",
      "instances": 1,
      "type": "t1micro"
    }
  }
]
Other URLs that will work:

https://ops-dev.blinker.com/v1/orchestrate/blinker.com/ops-dev/
https://ops-dev.blinker.com/v1/orchestrate/blinker.com/staging/
Start Orchestration

The API endpoint has been changed to look like

POST https://ops-dev.blinker.com/v1/orchestrate/{domain_class}/{domain_instance}/{name}
where
domain_class is blinker.com
domain_instance is ops-dev, staging, production
name is one of the name field from the objects returned in the List Orchestrations call.

The body now changed too. It has the format:

{
    "note" : "some note here",
    "context" : {
         // this is the object that used to be the body of this POST.
    }
}
For example:

POST - https://ops-dev.blinker.com/v1/orchestrate/blinker.com/ops-dev/provision_instance
with body

{
    "note":"This is a test2.",
    "context" : {
      "image": "aws-ami-1234",
      "instances": 1,
      "type": "t1micro"
    }
}
will return

{
  "id": "c1b9475c-39a8-11e5-9e1c-0295f5843583",
  "start_timestamp": 1438583267,
  "log_ws_url": "/v1/ws/feed/blinker.com/ops-dev/provision_instance/c1b9475c-39a8-11e5-9e1c-0295f5843583",
  "context": {
    "image": "aws-ami-1234",
    "instances": 1,
    "type": "t1micro"
  },
  "note": "This is a test2."
}


** ALL CALLS REQUIRE THE AUTH TOKEN **

GET - https://ops-dev.blinker.com/v1/orchestrate/{domain_class}/{domain_instance}/{orchestration_name}/
The parameters are the same as when you start an orchestration. See #73

Example:

GET - https://ops-dev.blinker.com/v1/orchestrate/blinker.com/production/provision_instance/
Returns

[
  {
    "domain": "production.blinker.com",
    "id": "eeada0c5-39b1-11e5-93c0-0295f5843583",
    "name": "provision_instance",
    "start_time": "2015-08-03T07:33:28.101913816Z",
    "completion_time": "0001-01-01T00:00:00Z",
    "status": "Started",
    "user": "Dash",
    "note": "This is a test2."
  },
  {
    "domain": "production.blinker.com",
    "id": "ef5e1d74-39b1-11e5-93c0-0295f5843583",
    "name": "provision_instance",
    "start_time": "2015-08-03T07:33:29.258539698Z",
    "completion_time": "0001-01-01T00:00:00Z",
    "status": "Started",
    "user": "Dash",
    "note": "This is a test2."
  },
  {
    "domain": "production.blinker.com",
    "id": "f029611a-39b1-11e5-93c0-0295f5843583",
    "name": "provision_instance",
    "start_time": "2015-08-03T07:33:30.590670328Z",
    "completion_time": "0001-01-01T00:00:00Z",
    "status": "Started",
    "user": "Dash",
    "note": "This is a test2."
  }
]
So the new screen that shows the history of orchestration instances should have a table with the columns:

Status - a simple icon RED is status == error , GREEN if status=completed, YELLOW if status==Started`
Time stamp
User
Note
When the user selects one of the rows, another API call will be made to get the details. Using the id, domain and name fields:

GET - https://ops-dev.blinker.com/v1/orchestrate/blinker.com/production/provision_instance/f029611a-39b1-11e5-93c0-0295f5843583
This will return the detail of the last run. Something like:

{
  "model": {
    "exec_only": false,
    "name": "provision_instance",
    "info": "",
    "success": "",
    "error": "",
    "context": null,
    "status": "",
    "stat": {},
    "configs": null,
    "friendly_name": "Provision minion instances",
    "dsecription": "Starts new minion instance and add to the pool for a given environment",
    "default_context": {
      "image": "aws-ami-1234",
      "instances": 1,
      "type": "t1micro"
    }
  },
  "info": {
    "domain": "production.blinker.com",
    "id": "f029611a-39b1-11e5-93c0-0295f5843583",
    "name": "provision_instance",
    "start_time": "2015-08-03T07:33:30.590670328Z",
    "completion_time": "0001-01-01T00:00:00Z",
    "status": "Started",
    "user": "Dash",
    "note": "This is a test2."
  },
  "log": "",
  "context": {
    "image": "aws-ami-1234",
    "instances": 1,
    "type": "t1micro"
  }
}


How can I get a list of available domains and versions? Requests for this domains:

{
                "service": "blinker",
                "instances": [ "ops-dev", "staging", "production" ],
                "versions":[ "develop", "v1.0", "v1.1" ],
                "live": {
                    "ops-dev" : "develop",
                    "staging" : "v1.0",
                    "production" : "v1.0"
                }
            },
            {
                "service": "vdp",
                "instances": [ "ops-dev", "staging", "production" ],
                "versions":[ "v0.1", "v1.0" ],
                "live": {
                    "ops-dev" : "v1.0",
                    "staging" : "v0.1",
                    "production" : "v0.1"
                }
            }{
                "service": "blinker",
                "instances": [ "ops-dev", "staging", "production" ],
                "versions":[ "develop", "v1.0", "v1.1" ],
                "live": {
                    "ops-dev" : "develop",
                    "staging" : "v1.0",
                    "production" : "v1.0"
                }
            },
            {
                "service": "vdp",
                "instances": [ "ops-dev", "staging", "production" ],
                "versions":[ "v0.1", "v1.0" ],
                "live": {
                    "ops-dev" : "v1.0",
                    "staging" : "v0.1",
                    "production" : "v0.1"
                }
            }
Return {"error":"get-env-fails"}


1. Get list of available orchestrations for an environment:

This is an authenticated call. Please include auth token. The auth token is not checked currently by the dev server.

GET - http://52.24.70.156/v1/orchestrate/blinker.com/ops-test/
Returns

[
  {
    "name": "provision_instance",
    "label": "Provision minion instances",
    "description": "Starts new minion instance and add to the pool for a given environment",
    "activate_url": "/v1/orchestrate/ops-test.blinker.com/provision_instance",
    "default_input": {
      "image": "aws-ami-1234",
      "instances": 1,
      "type": "t1micro"
    }
  },
  {
    "name": "blinker_db_migrate",
    "label": "Run db migration (blinker)",
    "description": "Run database migration for blinker",
    "activate_url": "/v1/orchestrate/ops-test.blinker.com/blinker_db_migrate",
    "default_input": {
      "retry": false
    }
  },
  {
    "name": "blinker_build_image",
    "label": "Build Docker image (blinker)",
    "description": "Build docker image for blinker service",
    "activate_url": "/v1/orchestrate/ops-test.blinker.com/blinker_build_image",
    "default_input": {
      "git_branch": "develop",
      "git_repo": "git@github.com:BlinkerGit/test.git",
      "git_tag": "release1.0"
    }
  }
]



When an environment is selected (eg. Api / Production), a call to the endpoint
/v1/orchestrate/{domain_class}/{domain_instance}/
will return a list of "workflows" that can be run in this environment:

[
  {
    "name": "provision_instance",
    "label": "Provision minion instances",
    "description": "Starts new minion instance and add to the pool for a given environment",
    "activate_url": "/v1/orchestrate/ops-test.blinker.com/provision_instance",
    "default_input": {
      "image": "aws-ami-1234",
      "instances": 1,
      "type": "t1micro"
    }
  },
  {
    "name": "blinker_db_migrate",
    "label": "Run db migration (blinker)",
    "description": "Run database migration for blinker",
    "activate_url": "/v1/orchestrate/ops-test.blinker.com/blinker_db_migrate",
    "default_input": {
      "retry": false
    }
  },
  {
    "name": "blinker_build_image",
    "label": "Build Docker image (blinker)",
    "description": "Build docker image for blinker service",
    "activate_url": "/v1/orchestrate/ops-test.blinker.com/blinker_build_image",
    "default_input": {
      "git_branch": "develop",
      "git_repo": "git@github.com:BlinkerGit/test.git",
      "git_tag": "release1.0"
    }
  }
]


GET - https://ops-dev.blinker.com/v1/dockerapi/blinker.com/dev/10.31.41.127/info
Returns

{
    "Containers": 5,
    "Debug": 0,
    "DockerRootDir": "/var/lib/docker",
    "Driver": "devicemapper",
    "DriverStatus": [
        [
            "Pool Name",
            "docker-202:1-524929-pool"
        ],
        [
            "Pool Blocksize",
            "65.54 kB"
        ],
        [
            "Backing Filesystem",
            "extfs"
        ],
        [
            "Data file",
            "/dev/loop0"
        ],
        [
            "Metadata file",
            "/dev/loop1"
        ],
        [
            "Data Space Used",
            "4.253 GB"
        ],
        [
            "Data Space Total",
            "107.4 GB"
        ],
        [
            "Data Space Available",
            "59.05 GB"
        ],
        [
            "Metadata Space Used",
            "7.533 MB"
        ],
        [
            "Metadata Space Total",
            "2.147 GB"
        ],
        [
            "Metadata Space Available",
            "2.14 GB"
        ],
        [
            "Udev Sync Supported",
            "false"
        ],
        [
            "Data loop file",
            "/var/lib/docker/devicemapper/devicemapper/data"
        ],
        [
            "Metadata loop file",
            "/var/lib/docker/devicemapper/devicemapper/metadata"
        ],
        [
            "Library Version",
            "1.02.82-git (2013-10-04)"
        ]
    ],
    "ExecutionDriver": "native-0.2",
    "ID": "6CWC:72GK:UNDO:5PQJ:UODF:LYII:A4FS:DLNQ:6IEK:PISO:N25K:TKSB",
    "IPv4Forwarding": 1,
    "Images": 168,
    "IndexServerAddress": "https://index.docker.io/v1/",
    "InitPath": "/usr/bin/docker",
    "InitSha1": "7f9c6798b022e64f04d2aff8c75cbf38a2779493",
    "KernelVersion": "3.13.0-36-generic",
    "Labels": null,
    "MemTotal": 2097610752,
    "MemoryLimit": 1,
    "NCPU": 1,
    "NEventsListener": 1,
    "NFd": 38,
    "NGoroutines": 68,
    "Name": "ip-10-31-41-127",
    "OperatingSystem": "Ubuntu 14.04.1 LTS",
    "RegistryConfig": {
        "IndexConfigs": {
            "docker.io": {
                "Mirrors": null,
                "Name": "docker.io",
                "Official": true,
                "Secure": true
            }
        },
        "InsecureRegistryCIDRs": [
            "127.0.0.0/8"
        ]
    },
    "SwapLimit": 0,
    "SystemTime": "2015-09-09T06:05:26.598409967Z"
}


### List orchestrations:
GET https://ops-dev.blinker.com/v1/orchestrate/{domain_class}/{domain_instance}/
Don't forget the trailing /.

For example:

https://ops-dev.blinker.com/v1/orchestrate/blinker.com/production/
returns

[
  {
    "name": "blinker_build_image",
    "label": "Build Docker image (blinker)",
    "description": "Build docker image for blinker service",
    "activate_url": "/v1/orchestrate/production.blinker.com/blinker_build_image",
    "default_input": {
      "git_branch": "develop",
      "git_repo": "git@github.com:BlinkerGit/test.git",
      "git_tag": "release1.0"
    }
  },
  {
    "name": "blinker_db_migrate",
    "label": "Run db migration (blinker)",
    "description": "Run database migration for blinker",
    "activate_url": "/v1/orchestrate/production.blinker.com/blinker_db_migrate",
    "default_input": {
      "retry": false
    }
  },
  {
    "name": "provision_instance",
    "label": "Provision minion instances",
    "description": "Starts new minion instance and add to the pool for a given environment",
    "activate_url": "/v1/orchestrate/production.blinker.com/provision_instance",
    "default_input": {
      "image": "aws-ami-1234",
      "instances": 1,
      "type": "t1micro"
    }
  }
]


1. Get list of available orchestrations for an environment:

This is an authenticated call. Please include auth token. The auth token is not checked currently by the dev server.

GET - http://52.24.70.156/v1/orchestrate/blinker.com/ops-test/
Returns

[
  {
    "name": "provision_instance",
    "label": "Provision minion instances",
    "description": "Starts new minion instance and add to the pool for a given environment",
    "activate_url": "/v1/orchestrate/ops-test.blinker.com/provision_instance",
    "default_input": {
      "image": "aws-ami-1234",
      "instances": 1,
      "type": "t1micro"
    }
  },
  {
    "name": "blinker_db_migrate",
    "label": "Run db migration (blinker)",
    "description": "Run database migration for blinker",
    "activate_url": "/v1/orchestrate/ops-test.blinker.com/blinker_db_migrate",
    "default_input": {
      "retry": false
    }
  },
  {
    "name": "blinker_build_image",
    "label": "Build Docker image (blinker)",
    "description": "Build docker image for blinker service",
    "activate_url": "/v1/orchestrate/ops-test.blinker.com/blinker_build_image",
    "default_input": {
      "git_branch": "develop",
      "git_repo": "git@github.com:BlinkerGit/test.git",
      "git_tag": "release1.0"
    }
  }
]
Use each object to render the dynamic form. Note the activate_url for each orchestration object. This is the URL to start an orchestration instance.

2. Start an orchestration.

The user has selected an orchestration to run. For example, she may wish to start new instances. Using the activate_url in the object from Step 1:

POST - http://52.24.70.156/v1/orchestrate/ops-test.blinker.com/provision_instance
with body:

{
      "image": "aws-ami-1234",
      "instances": 1,
      "type": "t1micro"
}
Returns

{
  "id": "76f774d0-2f18-11e5-a425-0295f5843583",
  "start_timestamp": 1437421782,
  "log_ws_url": "/v1/ws/run/timeline1",
  "context": {
    "image": "aws-ami-1234",
    "instances": 1,
    "type": "t1micro"
  }
}
The response JSON is an instance of a running orchestration on the cluster. To see what's going on, follow the log_ws_url. So in this case connect the timeline to

ws://52.24.70.156/v1/ws/run/timeline1
