export const past = {
    "query": {
      "upcoming": false
    },
    "options": {
      "sort": {
        "flight_number":"desc"
      },
      "limit": 500,
      "populate": [
        {
          "path": "rocket",
          "select": {
            "flickr_images": 1,
            "name": 1,
            "type": 1,
            "active": 1,
            "stages": 1,
            "boosters": 1,
            "cost_per_launch": 1,
            "success_rate_ptc": 1,
            "first_fligth": 1
          }
        }
      ]
    }
}