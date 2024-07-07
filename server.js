/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import express from "express";
import axios from "axios";
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
dotenv.config();

const { WEBHOOK_VERIFY_TOKEN, GRAPH_API_TOKEN, PORT } = process.env;

app.post("/webhook", async (req, res) => {
  // console.log("Incoming message:",JSON.stringify(req.body, null, 2));
  const message = req.body.entry?.[0]?.changes[0]?.value?.messages?.[0];
  const business_phone_number_id = req.body.entry?.[0].changes?.[0].value?.metadata?.phone_number_id;

  // check if the incoming message contains text
  if (message?.type === "text") {
    // extract the business number to send the reply from it
    if (message.text.body === "Feedback") {

      await axios({
        method: "POST",
        url: `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`,
        headers: {
          Authorization: `Bearer ${GRAPH_API_TOKEN}`,
        },
        data: {
          messaging_product: "whatsapp",
          to: message.from,
          type: "interactive",
          interactive: {
            type: "list",
            header: {
              type: "text",
              text: "Feedback for Moti Mahal"
            },
            body: {
              text: "We hope you had a delightful experience at Moti Mahal. Your feedback is important to us and helps us improve our service. Please take a moment to rate your visit."
            },
            footer: {
              text: "--Powered By YourAds.in"
            },
            action: {
              sections: [
                {
                  title: "Ambiance:",
                  rows: [
                    {
                      id: "ambiance_1",
                      title: "Excellent",
                      // description: "Excellent"
                    },
                    {
                      id: "ambiance_2",
                      title: "Good",
                      // description: "Good"
                    },
                    {
                      id: "ambiance_3",
                      title: "Average",
                      // description: "Average"
                    },
                    {
                      id: "ambiance_4",
                      title: "Poor",
                      // description: "Poor"
                    }

                  ]
                },
                {
                  title: "Move to next category:",
                  rows: [
                    {
                      id: "Skip",
                      title: "Skip",
                    }
                  ]
                }


              ],
              button: "Rate Now"
            }
          }
        },
      });
    }
    else {

      await axios({
        method: "POST",
        url: `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`,
        headers: {
          Authorization: `Bearer ${GRAPH_API_TOKEN}`,
        },
        data: {
          messaging_product: "whatsapp",
          to: message.from,
          text: { body: "Hii" },
          // context: {
          //   message_id: message.id, // shows the message as a reply to the original user message
          // },
        },
      });
    }
  }

  if (message?.type === "interactive") {
    console.log("List reply received:", message.interactive.list_reply);
    if (message.interactive.list_reply.id == "ambiance_1" || message.interactive.list_reply.id == "ambiance_2" || message.interactive.list_reply.id == "ambiance_3" || message.interactive.list_reply.id == "ambiance_4") {
      await axios({
        method: "POST",
        url: `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`,
        headers: {
          Authorization: `Bearer ${GRAPH_API_TOKEN}`,
        },
        data: {
          messaging_product: "whatsapp",
          to: message.from,
          type: "interactive",
          interactive: {
            type: "list",
            body: {
              text: "Service: How would you rate the service provided by our staff?"
            },
            footer: {
              text: "--Powered By YourAds.in"
            },
            action: {
              sections: [
                {
                  title: "Service:",
                  rows: [
                    {
                      id: "service_1",
                      title: "Excellent",
                      // description: "Excellent"
                    },
                    {
                      id: "service_2",
                      title: "Good",
                      // description: "Good"
                    },
                    {
                      id: "service_3",
                      title: "Average",
                      // description: "Average"
                    },
                    {
                      id: "service_4",
                      title: "Poor",
                      // description: "Poor"
                    }

                  ]
                },
                {
                  title: "Move to next category:",
                  rows: [
                    {
                      id: "Skip",
                      title: "Skip",
                    }
                  ]
                }


              ],
              button: "Rate Now"
            }
          }
        },
      });
    }
    else if (message.interactive.list_reply.id == "service_1" || message.interactive.list_reply.id == "service_2" || message.interactive.list_reply.id == "service_3" || message.interactive.list_reply.id == "service_4") {
      await axios({
        method: "POST",
        url: `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`,
        headers: {
          Authorization: `Bearer ${GRAPH_API_TOKEN}`,
        },
        data: {
          messaging_product: "whatsapp",
          to: message.from,
          type: "interactive",
          interactive: {
            type: "list",
            body: {
              text: "Food Quality: How satisfied were you with the quality of the food?"
            },
            footer: {
              text: "--Powered By YourAds.in"
            },
            action: {
              sections: [
                {
                  title: "Food Quality:",
                  rows: [
                    {
                      id: "foodQuality_1",
                      title: "Excellent",
                      // description: "Excellent"
                    },
                    {
                      id: "foodQuality_2",
                      title: "Good",
                      // description: "Good"
                    },
                    {
                      id: "foodQuality_3",
                      title: "Average",
                      // description: "Average"
                    },
                    {
                      id: "foodQuality_4",
                      title: "Poor",
                      // description: "Poor"
                    }

                  ]
                },
                {
                  title: "Move to next category:",
                  rows: [
                    {
                      id: "Skip",
                      title: "Skip",
                    }
                  ]
                }


              ],
              button: "Rate Now"
            }
          }
        },
      });
    }
    else if (message.interactive.list_reply.id == "foodQuality_1" || message.interactive.list_reply.id == "foodQuality_2" || message.interactive.list_reply.id == "foodQuality_3" || message.interactive.list_reply.id == "foodQuality_4") {
      await axios({
        method: "POST",
        url: `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`,
        headers: {
          Authorization: `Bearer ${GRAPH_API_TOKEN}`,
        },
        data: {
          messaging_product: "whatsapp",
          to: message.from,
          type: "interactive",
          interactive: {
            type: "list",
            body: {
              text: "Cleanliness: How would you rate the cleanliness of our restaurant?"
            },
            footer: {
              text: "--Powered By YourAds.in"
            },
            action: {
              sections: [
                {
                  title: "Cleanliness:",
                  rows: [
                    {
                      id: "cleanliness_1",
                      title: "Excellent",
                      // description: "Excellent"
                    },
                    {
                      id: "cleanliness_2",
                      title: "Good",
                      // description: "Good"
                    },
                    {
                      id: "cleanliness_3",
                      title: "Average",
                      // description: "Average"
                    },
                    {
                      id: "cleanliness_4",
                      title: "Poor",
                      // description: "Poor"
                    }

                  ]
                },
                {
                  title: "Move to next category:",
                  rows: [
                    {
                      id: "Skip",
                      title: "Skip",
                    }
                  ]
                }


              ],
              button: "Rate Now"
            }
          }
        },
      });
    }
    else if (message.interactive.list_reply.id == "cleanliness_1" || message.interactive.list_reply.id == "cleanliness_2" || message.interactive.list_reply.id == "cleanliness_3" || message.interactive.list_reply.id == "cleanliness_4") {
      await axios({
        method: "POST",
        url: `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`,
        headers: {
          Authorization: `Bearer ${GRAPH_API_TOKEN}`,
        },
        data: {
          messaging_product: "whatsapp",
          to: message.from,
          type: "interactive",
          interactive: {
            type: "list",
            body: {
              text: "Value for Money: Do you feel that you received good value for the price paid?"
            },
            footer: {
              text: "--Powered By YourAds.in"
            },
            action: {
              sections: [
                {
                  title: "Value For Money:",
                  rows: [
                    {
                      id: "VFM_1",
                      title: "Excellent",
                      // description: "Excellent"
                    },
                    {
                      id: "VFM_2",
                      title: "Good",
                      // description: "Good"
                    },
                    {
                      id: "VFM_3",
                      title: "Average",
                      // description: "Average"
                    },
                    {
                      id: "VFM_4",
                      title: "Poor",
                      // description: "Poor"
                    }

                  ]
                },
                {
                  title: "Move to next category:",
                  rows: [
                    {
                      id: "Skip",
                      title: "Skip",
                    }
                  ]
                }


              ],
              button: "Rate Now"
            }
          }
        },
      });
    }
    else {
      await axios({
        method: "POST",
        url: `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`,
        headers: {
          Authorization: `Bearer ${GRAPH_API_TOKEN}`,
        },
        data: {
          messaging_product: "whatsapp",
          to: message.from,
          type: "image",
          image: {
            id: "509385264857844",
            caption: "Thank you for your feedback! Here is a coupon for your next visit: COUPONCODE123. We look forward to serving you again at Moti Mahal."
          }

        },
      });
    }
  }
  // await axios({
  //   method: "POST",
  //   url: `https://graph.facebook.com/v18.0/${business_phone_number_id}/messages`,
  //   headers: {
  //     Authorization: `Bearer ${GRAPH_API_TOKEN}`,
  //   },
  //   data: {
  //     messaging_product: "whatsapp",
  //     status: "read",
  //     message_id: message.id,
  //   },
  // });
  res.sendStatus(200);
});

// accepts GET requests at the /webhook endpoint. You need this URL to setup webhook initially.
// info on verification request payload: https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  // check the mode and token sent are correct
  if (mode === "subscribe" && token === WEBHOOK_VERIFY_TOKEN) {
    // respond with 200 OK and challenge token from the request
    res.status(200).send(challenge);
    console.log("Webhook verified successfully!");
  } else {
    // respond with '403 Forbidden' if verify tokens do not match
    res.sendStatus(403);
  }
});

app.get("/", (req, res) => {
  res.send(`<pre>Nothing to see here.
Checkout README.md to start.</pre>`);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
