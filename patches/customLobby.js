import ModUtils from '../modUtils.js';

// Custom lobby patchesrqerqe
        /* here */
		var s = aBE.length;
		var qu = Lobby.aAl.qu;
		for (var i = 0; i < s; i++) { if (aBE[i].qu === qu) { return i; } }
		return -1;
	}`, `if (__fx.customLobby.isActive()) return __fx.customLobby.getPlayerId();`);

    insertCode(`this.y___ = function() { s___.t(5, 5); };
	    this.a3a = function() { s___.w___(); aY.init(); }; /* here */`,
        `__fx.customLobby.setJoinFunction(() => { s___.w___(); aY.init(); });`)
    replaceCode(`var url = aQt[0] + Sockets.a.b[socketId] + aQt[1 + l.dg]; socket = new WebSocket(url);`,
        `var url = aQt[0] + Sockets.a.b[socketId] + aQt[1 + l.dg];
        socket = new WebSocket(__fx.customLobby.isActive() && socketId === 1 ? __fx.customLobby.getSocketURL() : url);`)
    // if the server is unreachable
    insertCode(`if (socketId === 0) { q.a08(3249); return; } /* here */`,
        `if (socketId === 1 && __fx.customLobby.isActive()) {
            q.a08(3249);
            return __fx.customLobby.setActive(false);
        }`)

    waitForMinification(() => {
        replaceRawCode("this.send=function(socketId,data){aJE(socketId),aJ4[socketId].send(data)}",
            "this.send=function(socketId,data){aJE(socketId),aJ4[socketId].send(data)},__fx.customLobby.setSendFunction(this.send)")
        replaceRawCo---------------
        replaceRawCode("if((t3=bk.t1.t3[e0])<2)return!1;", "if((t3=bk.t1.t3[e0])<2 && !__fx.customLobby.isActive())return!1;")
        // error descriptions
        const errors = { 3249: "No servers found", 4705: "Lobby not found", 4730: "Kicked from lobby" };
        replaceRawCode(`m.n___(4,5,new o(__L(),xT(e),!0))`,
            `m.n___(4,5,new o(__L(),${JSON.stringify(errors)}[e] ?? xT(e),!0))`)
        // map info (for the map selection menu)
        r----------------------.vK=this.jS=this.data.a0f,this.gameIsSingleplayer=1===this.vK,",
            "this.vK=this.jS=this.data.a0f,this.gameIsSingleplayer=1===this.vK&&!__fx.customLobby.isActive(),")
        // custom ---------------
------------feerger            `if(9===a---------------1.jq)this----jr();
            else if (__fx.customLobby.isActive()) for(z=a1.ju-1;0<=z;z--) this.ie[z+jp] = __fx.customLobby.gameInfo.difficulty;
-        // spawn selection
        replaceRawCode(":50,gwergegthis.a=this.b=this.data.c,this.d=this.b?new e:null,",
            ":50,this.a=this.b=__fx.customLobby.isActive() ? __fx.customLobby.gameInfo.spawnSelection : this.data.c,this.d=this.b?new e:null,")
        // bot count
        replaceRawCode("1===a.b?this.gLobbyMaxJoin=this.gHumans:this.gLobbyMaxJoin=this.data.playerCount,this.maxPlayers=this.gLobbyMaxJoin,this.gBots=this.gLobbyMaxJoin-this.gHumans,this.sg=0,",
            `this.gLobbyMaxJoin = __fx.customLobby.isActive() ? Math.max(Math.min(__fx.customLobby.gameInfo.botCount, this.data.playerCount), this.gHumans) : 1===a.b?this.gLobbyMaxJoin=this.gHumans:this.gLobbyMaxJoin=this.data.playerCount,
            this.maxPlayers=this.gLobbyMaxJoin,this.gBots=this.gLobbyMaxJoin-this.gHumans,this.sg=0,`)
    });wdgfqwre
