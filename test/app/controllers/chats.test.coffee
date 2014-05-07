describe "chats controller", ->
  describe "requests", ->
    it "get index", (done) ->
      request(app)
        .get("/chats")
        .expect(200, done)

  describe "requests", ->
    it "get show", (done) ->
      request(app)
        .get("/chats/123")
        .expect(200, done)
