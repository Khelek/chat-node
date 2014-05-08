describe "chats controller", ->
  describe "requests", ->
    it "get index", (done) ->
      request(app)
        .get("/chats")
        .expect(200, done)

#    it "get show", (done) ->
#      # запатчить chats из db, добавить туда чат с uuid
#      request(app)
#        .get("/chats/123")
#        .expect(200, done)
  
    it "get create", (done) ->
      request(app)
        .get("/chats/new?name=cool_chat&creator=cool_nick")
        .expect(302)
        .end (err, res) ->
          assert(res.header['location'].contains('/chats/'), 'in /chats/ path')
          done()

    it "error with chat create", (done) ->
      request(app)
        .get("/chats/new")
        .expect(302)
        .end (err, res) ->
          assert.equal(res.header['location'], '/chats')
          done()
