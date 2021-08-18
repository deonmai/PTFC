const express = require('express');
const cors = require('cors');

const crypto = require('crypto');
const mime = require('mime');

// const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
// var router = express.Router();
var bodyParser = require('body-parser');
// used for image uplaod
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'client/public/assets/img/trainer_images')
    },
    filename: function (req, file, cb) {
      crypto.pseudoRandomBytes(16, function (err, raw) {
        cb(null, raw.toString('hex') + Date.now() + '.' + mime.getExtension(file.mimetype));
      });
    }
});
var upload = multer({ storage: storage });
var uploaded_images = [];

const { json } = require('express');
const { readSync } = require('fs');
const { connect } = require('http2');
var jsonParser = bodyParser.json();
var dbConnectionPool = mysql.createPool({ host: 'localhost', database: 'pt_club'});
var options = {
    days: ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"],
    months: ["Jan", "Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    years: ["2020","2019","2018","2017","2016","2015","2014","2013","2012","2011","2010","2009","2008","2007","2006","2005","2004","2003","2002","2001","2000","1999","1998","1997","1996","1995","1994","1993","1992","1991","1990","1989","1988","1987","1986","1985","1984","1983","1982","1981","1980","1979","1978","1977","1976","1975","1974","1973","1972","1971","1970","1969","1968","1967","1966","1965","1964","1963","1962","1961","1960","1959","1958","1957","1956","1955","1954","1953","1952","1951","1950","1949","1948","1947","1946","1945","1944","1943","1942","1941","1940","1939","1938","1937","1936","1935","1934","1933","1932","1931","1930","1929","1928","1927","1926","1925","1924","1923","1922","1921","1920","1919","1918","1917","1916","1915","1914","1913","1912","1911","1910","1909","1908","1907","1906","1905","1904","1903","1902","1901","1900"],
    genders: ["Female","Male"],
    muscle_group: ["Abdominals", "Biceps", "Calves", "Deltoids", "Forearms", "Gluteus Maximus","Hamstrings", "Hips", "Latissimus Dorsi", "Lower Back", "Pectorals", "Quadriceps", "Trapezius", "Triceps"],
    languages: ["English", "Arabic", "Bengali", "Cantonese", "Dutch", "French", "German", "Hindi", "Indonesian", "Japanese", "Mandarin", "Punjabi", "Portuguese", "Russian", "Spanish", "Swahili", "Turkish","Urdu"],
    location_preferences: ["Home training", "Gym training"],
    suburbs: []
}

const app = express();

var corsOptions = {credentials: true};
cors(corsOptions);
app.use(cors());

//middelware
app.use(function(req, res, next) {
	req.pool = dbConnectionPool;
	next();
});

app.use('/s3', require('react-s3-uploader/s3router')({
    bucket: "MyS3Bucket",
    signatureExpires: 60, //optional, number of seconds the upload signed URL should be valid for (defaults to 60)
    ACL: 'private', // this is default
    uniquePrefix: true // (4.0.2 and above) default is true, setting the attribute to false preserves the original filename in S3
}));

app.use( session({
    resave: true,
    saveUninitialized: true,
    secure: false,
    secret:'the_web_boys_are_back'
}));

app.get('/session_test', function(req, res, next) {
    var sess = req.session
    res.write(sess)
})


app.get('/options', function(req, res, next) {
    req.pool.getConnection(function(err, connection) {
        var query = "SELECT DISTINCT city from addresses;";
        var suburbs = [];
        connection.query(query, [], function(err,rows,fields) {
            connection.release();
            if (err) {
                console.log(err);
                res.sendStatus(503);
            } else {
                if (rows.length > 0) {
                    options.suburbs = [];
                    for (i = 0; i < rows.length; i++) {
                        if (rows[i].city !== '') {
                            options.suburbs.push(rows[i].city);
                        } 
                    }
                    options.suburbs.sort();
                }
                res.json(options);
            }
        })   
    })
})

app.post('/pt_google_signin', jsonParser, (req,res) => {
    console.log(req.body);
    var query = "SELECT * FROM trainers WHERE EXTERNAL_ID = ?;";
    req.pool.getConnection(function(err, connection) {
        connection.query(query, [req.body.google_id], function(err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(402);
                return;
            }
            if (rows.length > 0) {
                // User has previously signed up via Google
                req.session.trainer_id = rows[0].trainer_id;
                console.log("LOGGED IN VIA GOOGLE - TRAINER ALREADY IN DATABASE");
                console.log(req.session.trainer_id);
                res.json(req.session.trainer_id);
            } else {
                // Create new user via Google
                query = "INSERT INTO trainers (first_name, last_name, email, EXTERNAL_ID) VALUES(?,?,?,?);"
                connection.query(query, [req.body.first_name, req.body.last_name, req.body.email, req.body.google_id], function(err, rows, fields) {
                    if (err) {
                        res.sendStatus(402);
                    } else {
                        console.log("ADDED NEW TRAINER TO DATABASE");
                        // Get session information
                        query = "SELECT trainer_id FROM trainers WHERE EXTERNAL_ID = ?;";
                        connection.query(query, [req.body.google_id], function(err, rows, fields) {
                            connection.release();
                            if (rows.length > 0) {
                                req.session.trainer_id = rows[0].trainer_id;
                                console.log("NEW TRAINER LOGGED IN VIA GOOGLE");
                                console.log(req.session.trainer_id);
                                res.json(req.session.trainer_id);
                            } else {
                                res.sendStatus(204);
                            }
                        });
                    }
                })
            }
        })
    });
})


app.post('/get_pt_profile', jsonParser, (req,res) => {
    // console.log(req.body);
    var query = "SELECT * FROM trainers WHERE trainer_id = ?;";
    req.pool.getConnection(function(err, connection) {
        connection.query(query, [req.body.trainer_id], function(err, rows, fields) {
            connection.release();
            if (err) {
                console.log(err);
                res.sendStatus(402);
                return;
            }
            if (rows.length > 0) {
                if (rows[0].date_of_birth === null) {
                    rows[0].date_of_birth = "01 Jan 2020";
                    res.json(rows[0]);
                } else {
                    var temp_dob = rows[0].date_of_birth.toString();
                    rows[0].date_of_birth = temp_dob.substring(8,10) + " " + temp_dob.substring(4,7) + " " + temp_dob.substring(11,15);
                    console.log(rows[0].date_of_birth)
                    res.json(rows[0]);
                }
            } else {
                res.sendStatus(204);
            }
        })
    });
})

app.post('/post_pt_biography', jsonParser, (req,res) => {
    console.log(req.body);
    var query = "UPDATE trainers SET biography = ? WHERE trainer_id = ?";
    req.pool.getConnection(function(err, connection) {
        connection.query(query, [req.body.biography, req.body.trainer_id], function(err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(402);
                return;
            }
            query = "SELECT * FROM trainers WHERE trainer_id = ?;";
            req.pool.getConnection(function(err, connection) {
                connection.query(query, [req.body.trainer_id], function(err, rows, fields) {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.sendStatus(402);
                        return;
                    }
                    if (rows.length > 0) {
                        // User has previously signed up via Google
                        res.json(rows[0]);
                    } else {
                        res.sendStatus(204);
                    }
                })
            });
        })
    });
})

// pt updates their profile
app.post('/post_pt_profile', jsonParser, (req,res) => {
    console.log(req.body);
    var query = "UPDATE trainers SET first_name = ?, last_name = ?, date_of_birth = ?, gender = ?, email = ?, mobile_number = ?, location_preference = ?, hourly_rate = ? WHERE trainer_id = ?";
    req.pool.getConnection(function(err, connection) {
        connection.query(query, [req.body.profile.first_name, req.body.profile.last_name, req.body.profile.date_of_birth, req.body.profile.gender, req.body.profile.email, req.body.profile.mobile_number, req.body.profile.location_preferences, req.body.profile.hourly_rate, req.body.profile.trainer_id], function(err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(402);
                return;
            }
            
            // updating the pt address
            query = "SELECT address_id FROM addresses WHERE street = '"+req.body.profile.street+"' AND city = '"+req.body.profile.city+"' AND state = '"+req.body.profile.state+"' AND post_code = '"+req.body.profile.postcode+"' AND country = '"+req.body.profile.country+"';";
            connection.query(query, [req.body.profile.street, req.body.profile.city, req.body.profile.state, req.body.profile.postcode, req.body.profile.country], function(err, rows, fields) {
                if (err) {
                    console.log(err);
                    res.sendStatus(402);
                    return;
                }
                if (rows.length > 0) {
                    // the inputted address is already in the database
                    console.log("DEON SUX", rows);
                    // var address_id = rows[0].address_id;
                    
                    query = "UPDATE trainers_addresses SET address_id = ? WHERE trainer_id = ?;"
                    connection.query(query, [rows[0].address_id, req.body.profile.trainer_id], function(err, rows, fields) {
                        if (err) {
                            console.log(err);
                            res.sendStatus(402);
                            return;
                        }
                    })                    
                } else {
                    // insert new address 
                    query = "INSERT INTO addresses (street, city, state, post_code, country) VALUES(?,?,?,?,?);";
                    connection.query(query, [req.body.profile.street, req.body.profile.city, req.body.profile.state, req.body.profile.postcode, req.body.profile.country], function(err, rows, fields) {
                        if (err) {
                            console.log(err);
                            res.sendStatus(402);
                            return;
                        }
                        query = "SELECT address_id FROM addresses WHERE street = '"+req.body.profile.street+"' AND city = '"+req.body.profile.city+"' AND state = '"+req.body.profile.state+"' AND post_code = '"+req.body.profile.postcode+"' AND country = '"+req.body.profile.country+"';"
                        connection.query(query, [req.body.profile.street, req.body.profile.city, req.body.profile.state, req.body.profile.postcode, req.body.profile.country], function(err, rows, fields) {
                            if (err) {
                                console.log(err);
                                res.sendStatus(402);
                                return;
                            }
                            // var address_id = rows[0].address_id;
                    
                            query = "UPDATE trainers_addresses SET address_id = ? WHERE trainer_id = ?;"
                            connection.query(query, [rows[0].address_id, req.body.profile.trainer_id], function(err, rows, fields) {
                                if (err) {
                                    console.log(err);
                                    res.sendStatus(402);
                                    return;
                                }
                            }) 
                        })

                    })
                }
            })
            query = "SELECT * FROM trainers WHERE trainer_id = ?;";
            connection.query(query, [req.body.profile.trainer_id], function(err, rows, fields) {
                connection.release();
                if (err) {
                    console.log(err);
                    res.sendStatus(402);
                    return;
                }
                console.log("QUERY ", rows);
                if (rows.length > 0) {
                    // User has previously signed up via Google
                    res.json(rows[0]);
                } else {
                    res.sendStatus(204);
                }
            })
        })
    });
})


app.post('/pt_signup', jsonParser, (req, res) => {
    // for multiple queries you have to use getConnection
    // have to release connection -- do that later
    req.pool.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            res.sendStatus(402);
            return;
        }
        var check_duplicate_query = "SELECT * FROM trainers WHERE email=?";
        connection.query(check_duplicate_query, [req.body.email], function(err, rows, fields) {
            if (rows.length > 0) {
                console.log("DUPLICATE EMAIL");
                res.sendStatus(400);
            } else {
                var query = "INSERT INTO trainers (first_name, last_name, email, password_hash) VALUES (?, ?, ?, SHA2(?,256));";
                connection.query(query, [req.body.first_name, req.body.last_name, req.body.email, req.body.password], function(err, rows, fields) {
                    if (err) {
                        console.log(err);
                        res.sendStatus(402);
                    } else {
                        console.log('NEW TRAINER ADDED TO DATABASE');
                        //when the user successfully signs up
                        query = "SELECT trainer_id from trainers WHERE email = ? AND password_hash = SHA2(?, 256);"
                        connection.query(query, [req.body.email, req.body.password], function (err, rows, fields) {
                        if (rows.length > 0) {
                            req.session.trainer_id = rows[0].trainer_id;
                            query = "INSERT INTO trainers_addresses (trainer_id, address_id) VALUES(?,1);"
                            connection.query(query, [req.session.trainer_id], function(err, rows, fields) {
                                connection.release();
                                if (err) {
                                    console.log(err);
                                    res.sendStatus(402);
                                } 
                            })
                            res.json(req.session.trainer_id);
                        } else {
                            res.sendStatus(402);
                        }
                        })
                    }
                });
            }
        });
    });
});

app.post('/pt_login', jsonParser, (req, res) => {
	if (req.session.trainer_id !== undefined) {
		res.sendStatus(200);
	} else {
		req.pool.getConnection(function(err, connection) {
			if (err) {
                res.sendStatus(402);
                console.log("failed to connect");
				return;
			}
            var query = "SELECT trainer_id FROM trainers WHERE email = ? AND password_hash = SHA2(?, 256);"
            connection.query(query, [req.body.email, req.body.password], function(err, rows, fields) {
                connection.release();
                if (rows.length > 0) {
                    req.session.trainer_id = rows[0].trainer_id;
                    console.log("TRAINER LOGGED IN");
                    res.json(req.session.trainer_id)
                } else {
                    console.log("WRONG PASSWORD")
                    res.sendStatus(403);
                }
            });
        });
    }
});

app.post('/client_signup', jsonParser, (req, res) => {
    // console.log(req.body);
    // console.log(req.body.first_name);
    // for multiple queries you have to use getConnection
    // have to release connection -- do that later
    req.pool.getConnection(function(err, connection) {
        if (err) {
            console.log(err);
            res.sendStatus(402);
            return;
        }
        var query = "INSERT INTO clients (first_name, last_name, email, password_hash) VALUES (?, ?, ?, SHA2(?,256));";
        connection.query(query, [req.body.first_name, req.body.last_name, req.body.email, req.body.password], function(err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(402);
                return;
            } else {
                console.log('NEW CLIENT ADDED TO DATABASE');
                //when the user successfully signs up
                query = "SELECT client_id from clients WHERE email = ? AND password_hash = SHA2(?, 256);"
                connection.query(query, [req.body.email, req.body.password], function (err, rows, fields) {
                    connection.release();
                    if (rows.length > 0) {
                        req.session.client_id = rows[0].client_id;
                        res.json(req.session.client_id);
                    } else {
                        res.sendStatus(402);
                    }
                })
            }
        });
    });
});

app.post('/client_login', jsonParser, (req, res) => {
	if (req.session.client_id !== undefined) {
		res.sendStatus(200);
	} else {
		req.pool.getConnection(function(err, connection) {
			if (err) {
                res.sendStatus(402);
                console.log("failed to connect");
				return;
			}
            var query = "SELECT client_id FROM clients WHERE email = ? AND password_hash = SHA2(?, 256);"
            connection.query(query, [req.body.email, req.body.password], function(err, rows, fields) {
                connection.release();
                if (rows.length > 0) {
                    req.session.client_id = rows[0].client_id;
                    console.log("CLIENT LOGGED IN");
                    res.json(req.session.client_id)
                } else {
                    console.log("WRONG PASSWORD")
                    res.sendStatus(403);
                }
            });
        });
    }
});

app.post('/pt_search', jsonParser, (req, res) => {
	req.pool.getConnection(function(err, connection) {
		if (err) {
            res.sendStatus(402);
            console.log("failed to connect");
			return;
        }

        
        gender_filters = [];
        muscle_filters = [];
        language_filters = [];
        location_filters = [];
        suburb_filters = [];

        console.log(req.body);
        // select * from trainers INNER JOIN trainers_addresses ON trainers.trainer_id = trainers_addresses.trainer_id INNER JOIN addresses ON trainers_addresses.address_id = addresses.address_id WHERE addresses.city = 'Norwood'
        
        if (req.body.gender.length > 0) {
            req.body.gender.forEach(element => gender_filters.push("trainers.gender = '"+element+"'") );
        }
        if (req.body.muscle.length > 0) {
            req.body.muscle.forEach(element => muscle_filters.push("trainers.muscle_group LIKE '%"+element+"%'") );
        }
        if (req.body.language.length > 0) {
            req.body.language.forEach(element => language_filters.push("trainers.languages_spoken LIKE '%"+element+"%'") );
        }
        if (req.body.location.length > 0) {
            req.body.location.forEach(element => location_filters.push("trainers.location_preference = '"+element+"'") );
        }
        if (req.body.suburb.length > 0) {
            req.body.suburb.forEach(element => suburb_filters.push("addresses.city = '"+element+"'") );
        }

        var where_query = " WHERE ";

        if (req.body.search_term != "") {   
            where_query += "(trainers.first_name LIKE '%"+req.body.search_term+"%')";
            if (gender_filters.length > 0 || muscle_filters.length > 0 || language_filters.length > 0 || location_filters.length > 0 || suburb_filters.length > 0) {
                where_query += " AND ";
            }
        }

        for (i = 0; i < gender_filters.length; i++) {
            if (i != 0) {
                where_query += " OR " + gender_filters[i];
            } else {
                where_query += "(" + gender_filters[i];
            }
            if (i === gender_filters.length - 1) {
                where_query += ")";
                if (muscle_filters.length > 0 || language_filters.length > 0 || location_filters.length > 0 || suburb_filters.length > 0) {
                    where_query += " AND ";
                }
            }
        }

        for (i = 0; i < muscle_filters.length; i++) {
            if (i != 0) {
                where_query += " OR " + muscle_filters[i];
            } else {
                where_query += "(" + muscle_filters[i];
            }
            if (i === muscle_filters.length - 1) {
                where_query += ")";
                if (language_filters.length > 0 || location_filters.length > 0 || suburb_filters.length > 0) {
                    where_query += " AND ";
                }
            }
        }

        for (i = 0; i < language_filters.length; i++) {
            if (i != 0) {
                where_query += " OR " + language_filters[i];
            } else {
                where_query += "(" + language_filters[i];
            }
            if (i === language_filters.length - 1) {
                where_query += ")";
                if (location_filters.length > 0 || suburb_filters.length > 0) {
                    where_query += " AND ";
                }
            }
        }

        for (i = 0; i < location_filters.length; i++) {
            if (i != 0) {
                where_query += " OR " + location_filters[i];
            } else {
                where_query += "(" + location_filters[i];
            }
            if (i === location_filters.length - 1) {
                where_query += ")";
                if (suburb_filters.length > 0) {
                    where_query += " AND ";
                }
            }
        } 

        for (i = 0; i < suburb_filters.length; i++) {
            if (i != 0) {
                where_query += " OR " + suburb_filters[i]
            } else {
                where_query += "(" + suburb_filters[i];
            }
            if (i === suburb_filters.length - 1) {
                where_query += ")";
            }
        }

        var query = "SELECT * FROM trainers INNER JOIN trainers_addresses ON trainers.trainer_id = trainers_addresses.trainer_id INNER JOIN addresses ON trainers_addresses.address_id = addresses.address_id";    
        if (where_query != " WHERE ") {
            query += where_query;
        }
        query += ";";

        console.log(query);

        connection.query(query, function(err, rows, fields) {
            connection.release();
            if (err) {
                console.log(err);
                res.sendStatus(403);
            }
            if (rows.length > 0) {
                approved_trainers = [];
                for (i = 0; i < rows.length; i++)
                {
                    if (rows[i].account_status == "Active")
                    {
                        approved_trainers.push(rows[i]);
                    }
                }
                res.json(approved_trainers);

            } else {
                console.log("no trainers alike")
                res.sendStatus(403)
            }
        });
    });
});


app.get('/home_page_pts', jsonParser, (req, res) => {
	req.pool.getConnection(function(err, connection) {
		if (err) {
            res.sendStatus(402);
            console.log("failed to connect");
			return;
        }
        // replace query with "SELECT first_name, last_name, biography, profile_image FROM trainers WHERE account_status='Approved';" when admin account is working
        var query = "SELECT * FROM trainers;"
        connection.query(query, [req.body.email, req.body.password], function(err, rows, fields) {
            connection.release();
            if (rows.length > 0) {
                if (rows.length < 6) {
                    console.log("NOT ENOUGH PTS!");
                    res.sendStatus(400);
                }
                else {
                    // only send back the first 6, only have 6 spots on the home page
                    selected_trainers = [];
                    for (i = 0; i < 6; i++) {
                        selected_trainers.push(rows[i]);
                    }
                    res.json(selected_trainers);
                }
            } else {
                console.log("NO SUCH PTS");
                res.sendStatus(403);
            }
        });
    });
});

// delete the previous availability in the database
app.post('/delete_availability', jsonParser, (req, res) => {
    req.pool.getConnection(function(err, connection) {
        var query = "DELETE FROM trainer_availability WHERE trainer_id = ? AND start_date_time LIKE '%"+req.body.start_date.substring(0,10)+"%';";
        connection.query(query, [req.body.trainer_id], function(err, rows, fields){
            connection.release();
            if (err) {
                console.log(err);
                res.sendStatus(401);
            } else {
                // console.log("deleted availability")
                res.sendStatus(200);
            }
        });
    });
});

// updating the availability of the pt - must delete first the old dates first
app.post('/update_availability', jsonParser, (req, res) => {
    req.pool.getConnection(function(err, connection) {
        var query = "INSERT INTO trainer_availability (trainer_id, start_date_time, end_date_time) VALUES (?,?,?);";
        connection.query(query, [req.body.trainer_id, req.body.start_date_time, req.body.end_date_time], function(err, rows, fields) {
            connection.release();
            if (err) {
                console.log(err);
                res.sendStatus(401);
            } else {
                res.sendStatus(200);
            }
        });
    });
});

// used to get the current availability of the pt
app.post('/get_day_availability', jsonParser, (req, res) => {
    req.pool.getConnection(function(err, connection) {
        var query = "SELECT * FROM trainer_availability WHERE trainer_id = ? AND start_date_time LIKE '%"+req.body.start_date+"%';";
        connection.query(query, [req.body.trainer_id], function(err, rows, fields) {
            connection.release();
            if (err) {
                console.log(err);
                res.sendStatus(401);
            } else {
                var availability_start_date_time = []
                for (i = 0; i < rows.length; i++)
                {
                    availability_start_date_time.push(rows[i].start_date_time.toString())
                }
                res.json(availability_start_date_time);
            }
        });
    });
});

app.post('/get_pt_availability', jsonParser, (req, res) => {
    req.pool.getConnection(function(err, connection) {
        var query = "SELECT trainer_availability.start_date_time, trainer_availability.end_date_time, trainers.first_name, trainers.last_name, trainers.hourly_rate, addresses.street, addresses.city, addresses.state, addresses.post_code FROM trainer_availability INNER JOIN trainers ON trainers.trainer_id = trainer_availability.trainer_id INNER JOIN trainers_addresses ON trainers_addresses.trainer_id = trainers.trainer_id INNER JOIN addresses ON addresses.address_id = trainers_addresses.address_id WHERE trainer_availability.trainer_id = ?;";
        connection.query(query, [req.body.trainer_id], function(err, rows, fields) {
            connection.release();
            if (err) {
                console.log(err);
                res.sendStatus(401);
            } else {
                var availability = [];
                for (i = 0; i < rows.length; i++)
                {
                    start_year = rows[i].start_date_time.getFullYear();
                    start_month = rows[i].start_date_time.getMonth()+1;
                    start_dt = rows[i].start_date_time.getDate();

                    if (start_dt < 10) {
                    	start_dt = '0' + start_dt;
                    }
                    if (start_month < 10) {
                    	start_month = '0' + start_month;
                    }

                    formatted_start_date = start_year + '-' + start_month + '-'+ start_dt;
                    start_time = rows[i].start_date_time.toString().substring(16,24);

                    formatted_start_date_time = formatted_start_date + " " + start_time;
                    availability.push(formatted_start_date_time);
                    rows[i].start_date_time = formatted_start_date_time;
                }
                res.json(rows);
            }
        });
    });
});

// function to get the bookings of the PT
app.post('/get_pt_bookings', jsonParser, (req, res) => {
    req.pool.getConnection(function(err, connection) {
        var query = "SELECT bookings.booking_id, bookings.client_id, bookings.start_date_time, bookings.end_date_time, bookings.booking_status, clients.first_name, clients.last_name, addresses.street, addresses.city, addresses.state, addresses.post_code FROM bookings INNER JOIN clients ON bookings.client_id = clients.client_id INNER JOIN trainers_addresses ON trainers_addresses.trainer_id = bookings.trainer_id INNER JOIN addresses ON addresses.address_id = trainers_addresses.address_id WHERE bookings.trainer_id = ?;";
        connection.query(query, [req.body.trainer_id], function(err, rows, fields) {
            connection.release();
            if (err) {
                console.log(err);
                res.sendStatus(401);
            } else {
                for (i = 0; i < rows.length; i++)
                {
                    // changing the date time from sql to a readable date and time yyyy-mm-dd hh:mm
                    start_year = rows[i].start_date_time.getFullYear();
                    start_month = rows[i].start_date_time.getMonth()+1;
                    start_dt = rows[i].start_date_time.getDate();
                    end_year = rows[i].start_date_time.getFullYear();
                    end_month = rows[i].start_date_time.getMonth()+1;
                    end_dt = rows[i].start_date_time.getDate();

                    if (start_dt < 10) {
                    	start_dt = '0' + start_dt;
                    }
                    if (start_month < 10) {
                    	start_month = '0' + start_month;
                    }
                    if (end_dt < 10) {
                    	end_dt = '0' + end_dt;
                    }
                    if (end_month < 10) {
                    	end_month = '0' + end_month;
                    }

                    formatted_start_date = start_year + '-' + start_month + '-'+ start_dt;
                    start_time = rows[i].start_date_time.toString().substring(16,24);
                    formatted_end_date = end_year + '-' + end_month + '-'+ end_dt;
                    end_time = rows[i].end_date_time.toString().substring(16,24);
                    formatted_start_date_time = formatted_start_date + " " + start_time;
                    formatted_end_date_time = formatted_end_date + " " + end_time;

                    rows[i].start_date_time = formatted_start_date_time;
                    rows[i].end_date_time = formatted_end_date_time;
                }
                res.json(rows);
            }
        });
    });
});

// client makes a booking, delete from the trainers availability and insert into bookings
app.post('/make_client_booking', jsonParser, (req, res) => {
    console.log(req.body)
    req.pool.getConnection(function(err, connection) {
        var query = "DELETE FROM trainer_availability WHERE trainer_id = ? AND start_date_time = ?;";
        connection.query(query, [req.body.trainer_id, req.body.start_date_time], function(err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(204);
            } else {
                query = "INSERT INTO bookings (trainer_id, client_id, start_date_time, end_date_time, booking_status) VALUES (?,?,?,?,'Pending');"
                connection.query(query, [req.body.trainer_id, req.body.client_id, req.body.start_date_time, req.body.end_date_time, req.body.address_id], function(err, rows, fields) {
                    connection.release();
                    console.log("inserting into bookings");
                    if (err) {
                        console.log(err);
                        res.sendStatus(204);
                    } else {
                        res.sendStatus(200);
                    }
                });
            }
        });
    });
})

// send the clients bookings from the database to display on the calendar
app.post('/get_client_bookings', jsonParser, (req, res) => {
    req.pool.getConnection(function(err, connection) {
        var query = "SELECT trainers.trainer_id, trainers.first_name, trainers.last_name, addresses.street, addresses.city, addresses.state, addresses.country, addresses.post_code, bookings.start_date_time, bookings.end_date_time, bookings.booking_status FROM bookings INNER JOIN trainers ON trainers.trainer_id = bookings.trainer_id INNER JOIN trainers_addresses ON trainers.trainer_id = trainers_addresses.trainer_id INNER JOIN addresses ON trainers_addresses.address_id = addresses.address_id WHERE bookings.client_id = ?;";
        connection.query(query, [req.body.client_id], function(err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(204);
            } else {
                var clients_bookings = rows;
                for (i = 0; i < clients_bookings.length; i++) {
                    // getting the correct date
                    var year = clients_bookings[i].start_date_time.getFullYear();
                    var month = clients_bookings[i].start_date_time.getMonth() + 1;
                    var day = clients_bookings[i].start_date_time.getDate();

                    if (parseInt(month) < 10) {
                        month = "0" + month;
                    }
                    if (parseInt(day) < 10) {
                        day = "0" + day;
                    }

                    // getting the time
                    var time = clients_bookings[i].start_date_time.toString().substring(16,24);
                    // concatentate the date and time
                    clients_bookings[i].start_date_time = year + "-" + month + "-" + day + " " + time;
                }
                res.json(clients_bookings);
            }
        });
    });
})

// trainer confirms the booking made by the client
app.post('/confirm_booking', jsonParser, (req, res) => {
    req.pool.getConnection(function(err, connection) {
        var query = "UPDATE bookings SET booking_status = 'Confirmed' WHERE trainer_id = ? AND start_date_time = ?;";
        connection.query(query, [req.body.trainer_id, req.body.start_date_time], function(err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(503)
            } else {
                console.log("CONFIRMED")
                res.sendStatus(200);
            }
        });
    });
})



// cancel the client booking and add the availabilty back to the PT
app.post('/cancel_booking', jsonParser, (req, res) => {
    req.pool.getConnection(function(err, connection) {
        var query = "UPDATE bookings SET booking_status = 'Cancelled' WHERE client_id = ? AND trainer_id = ? AND start_date_time = ?;";
        connection.query(query, [req.body.client_id, req.body.trainer_id, req.body.start_date_time], function(err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(503)
            } else {
                var query = "INSERT INTO trainer_availability (trainer_id, start_date_time, end_date_time) VALUES (?,?,?);";
                connection.query(query, [req.body.trainer_id, req.body.start_date_time, req.body.end_date_time], function(err, rows, fields) {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.sendStatus(401);
                    } else {
                        res.sendStatus(200);
                    }
                });
            }
        });
    });
})

app.post('/trainer_cancel_booking', jsonParser, (req, res) => {
    req.pool.getConnection(function(err, connection) {
        var query = "UPDATE bookings SET booking_status = 'Cancelled' WHERE trainer_id = ? AND start_date_time = ?;";
        connection.query(query, [req.body.trainer_id, req.body.start_date_time], function(err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(503)
            } else {
                var query = "INSERT INTO trainer_availability (trainer_id, start_date_time, end_date_time) VALUES (?,?,?);";
                connection.query(query, [req.body.trainer_id, req.body.start_date_time, req.body.end_date_time], function(err, rows, fields) {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.sendStatus(401);
                    } else {
                        res.sendStatus(200);
                    }
                });
            }
        });
    });
})

app.post('/update_languages', jsonParser, (req, res) => {
    console.log(req.body);
    req.pool.getConnection(function(err, connection) {
        var query = "UPDATE trainers SET languages_spoken = ? WHERE trainer_id = ?;";
        connection.query(query, [JSON.stringify(req.body.language), req.body.trainer_id], function(err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(503)
            } else {
                console.log("CONFIRMED")
                res.sendStatus(200);
            }
        });
    });
})

app.post('/update_muscles', jsonParser, (req, res) => {
    console.log(req.body);
    req.pool.getConnection(function(err, connection) {
        var query = "UPDATE trainers SET muscle_group = ? WHERE trainer_id = ?;";
        connection.query(query, [JSON.stringify(req.body.muscle), req.body.trainer_id], function(err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(503)
            } else {
                console.log("CONFIRMED")
                res.sendStatus(200);
            }
        });
    });
})

app.post('/upload', upload.single("file"), function(req, res, next) {
	// req.file is the single `image` file
	// req.body will contain the text fields, if there were any

    // sending the file path back to client
    res.json({filename: req.file.filename});
});

app.post('/upload_update_pt', jsonParser, (req,res) => {
    req.pool.getConnection(function(err, connection) {
        var query = "UPDATE trainers SET profile_image = ? WHERE trainer_id = ?;";
        connection.query(query, [req.body.filename, req.body.trainer_id], function(err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(503)
            } else {
                console.log("CONFIRMED")
                res.sendStatus(200);
            }
        });
    });
})

app.post('/get_pt_address', jsonParser, function(req,res,next) {
    req.pool.getConnection(function(err, connection) {
        var query = "SELECT addresses.street, addresses.city, addresses.state, addresses.country, addresses.post_code FROM addresses INNER JOIN trainers_addresses ON addresses.address_id = trainers_addresses.address_id  WHERE trainer_id = ?;"
        connection.query(query, [req.body.trainer_id], function(err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(503)
            } else {
                if (rows.length > 0) {
                    var address = rows[0].street + ", " + rows[0].city + ", " + rows[0].state + ", " + rows[0].post_code;
                    if(rows[0].street == '')
                    {
                        address = '';
                    }
                    res.json({street: rows[0].street, city: rows[0].city, state: rows[0].state, postcode: rows[0].post_code, country: rows[0].country, address: address});
                } else {
                    res.sendStatus(200);
                }
            }
        });
    })
})

app.post('/admin_login', jsonParser, (req, res) => {
	if (req.session.admin_id !== undefined) {
		res.sendStatus(200);
	} else {
		req.pool.getConnection(function(err, connection) {
			if (err) {
                res.sendStatus(402);
                console.log("failed to connect");
				return;
			}
            var query = "SELECT admin_id FROM admins WHERE email = ? AND password_hash = SHA2(?, 256);"
            connection.query(query, [req.body.user_name, req.body.password], function(err, rows, fields) {
                connection.release();
                if (rows.length > 0) {
                    req.session.admin_id = rows[0].admin_id;
                    console.log("ADMIN LOGGED IN");
                    res.json(req.session.admin_id)
                } else {
                    console.log("WRONG PASSWORD")
                    res.sendStatus(403);
                }
            });
        });
    }
});

app.post('/get_pt_address', jsonParser, function(req,res,next) {
    req.pool.getConnection(function(err, connection) {
        var query = "SELECT addresses.street, addresses.city, addresses.state, addresses.country, addresses.post_code FROM addresses INNER JOIN trainers_addresses ON addresses.address_id = trainers_addresses.address_id  WHERE trainer_id = ?;"
        connection.query(query, [req.body.trainer_id], function(err, rows, fields) {
            if (err) {
                console.log(err);
                res.sendStatus(503)
            } else {
                if (rows.length > 0) {
                    var address = rows[0].street + ", " + rows[0].city + ", " + rows[0].state + ", " + rows[0].post_code;
                    if(rows[0].street == '')
                    {
                        address = '';
                    }
                    console.log(rows);
                    res.json({street: rows[0].street, city: rows[0].city, state: rows[0].state, postcode: rows[0].post_code, country: rows[0].country, address: address});
                } else {
                    res.sendStatus(200);
                }
            }
        });
    })
})

app.post('/admin_search', jsonParser, (req,res) => {
    var query;
    if (req.body.account_type == "trainers") {
        if (req.body.account_status === "All") {
            query = "SELECT * FROM trainers;"
        } else {
            query = "SELECT * FROM trainers WHERE account_status = ?;";
        }
    } else {
        if (req.body.account_status === "All") {
            query = "SELECT * FROM clients;"
        } else {
            query = "SELECT * FROM clients WHERE account_status = ?;";
        }
    }
    req.pool.getConnection(function(err, connection) {
        connection.query(query, [req.body.account_status], function(err, rows, fields) {
            connection.release();
            if (err) {
                res.sendStatus(402);
                return;
            }
            res.send(rows)
        })
    });
})

app.post('/update_account_status', jsonParser, (req,res) => {
    var query, user_id;
    if (Object.keys(req.body.user)[0] == "trainer_id") {
        query = "UPDATE trainers SET account_status = ? WHERE trainer_id = ?;";
        user_id = req.body.user.trainer_id;
    } else {
        query = "UPDATE clients SET account_status = ? WHERE client_id = ?;";
        user_id = req.body.user.client_id;
    }
    req.pool.getConnection(function(err, connection) {
        connection.query(query, [req.body.account_status, user_id], function(err, rows, fields) {
            connection.release();
            if (err) {
                console.log(err);
                res.sendStatus(402);
                return;
            } 
            if (Object.keys(req.body.user)[0] == "trainer_id") {
                query = "SELECT * FROM trainers WHERE trainer_id = ?;";
            } else {
                query = "SELECT * FROM clients WHERE client_id = ?;";
            }
            req.pool.getConnection(function(err, connection) {
                connection.query(query, [user_id], function(err, rows, fields) {
                    connection.release();
                    if (err) {
                        console.log(err)
                        res.sendStatus(402);
                        return;
                    } 
                    console.log(rows[0])
                    res.send(rows[0])
                })
            });
        })
    });
})

app.listen(4000, () => {
    console.log('server started');
});
