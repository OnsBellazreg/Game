"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = require("socket.io");
var api_service_1 = __importDefault(require("./api.service"));
var port = 8082;
var io = new socket_io_1.Server({});
var apiService = new api_service_1.default();
var GameState;
(function (GameState) {
    GameState["WAIT"] = "wait";
    GameState["PLAY"] = "play";
})(GameState || (GameState = {}));
io.on("connection", function (socket) {
    console.log("a user connected", socket.id);
    socket.on("login", function (_a) {
        var username = _a.username;
        apiService
            .createUser(socket.id, username)
            .then(function () {
            socket.emit("message", {
                user: username,
                message: "Welcome " + username,
                socketId: socket.id,
            });
        })
            .catch(function (err) {
            socket.emit("error", { message: err });
        });
    });
    /* Join to the room */
    socket.on("joinRoom", function (_a) {
        var username = _a.username, room = _a.room, roomType = _a.roomType;
        apiService
            .assignRoom(room, socket.id, roomType)
            .then(function () {
            var _a, _b;
            socket.emit("message", {
                user: username,
                message: "welcome to room " + room,
                room: room,
            });
            if (roomType !== "cpu") {
                socket.broadcast.to(room).emit("message", {
                    user: username,
                    message: "has joined " + room,
                    room: room,
                });
            }
            /* Check the room with how many socket is connected */
            var maxRoomSize = roomType === "cpu" ? 1 : 2;
            socket.join(room);
            console.log(((_a = io.of("/").adapter.rooms.get(room)) === null || _a === void 0 ? void 0 : _a.size) === maxRoomSize);
            if (io.of("/").adapter.rooms.get(room) &&
                ((_b = io.of("/").adapter.rooms.get(room)) === null || _b === void 0 ? void 0 : _b.size) === maxRoomSize) {
                io.to(room).emit("onReady", { state: true });
            }
        })
            .catch(function (err) {
            socket.emit("error", { message: err });
        });
    });
    /* Start the game and send the first random number with turn control */
    socket.on("letsPlay", function () {
        apiService
            .getUserDetail(socket.id)
            .then(function (result) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, _b, _c, _d;
            var _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        io.to(result === null || result === void 0 ? void 0 : result.data.room).emit("randomNumber", {
                            number: "" + apiService.createRandomNumber(1999, 9999),
                            isFirst: true,
                        });
                        _b = (_a = io).emit;
                        _c = ["activateYourTurn"];
                        _d = {};
                        return [4 /*yield*/, io.in(result === null || result === void 0 ? void 0 : result.data.room).fetchSockets()];
                    case 1:
                        _b.apply(_a, _c.concat([(_d.user = (_e = (_f.sent())[0]) === null || _e === void 0 ? void 0 : _e.id,
                                _d.state = GameState.PLAY,
                                _d)]));
                        return [2 /*return*/];
                }
            });
        }); })
            .catch(function (err) {
            console.error(err);
            socket.emit("error", { message: err });
        });
    });
    /* Send Calculated number back with Divisible control */
    socket.on("sendNumber", function (_a) {
        var number = _a.number, selectedNumber = _a.selectedNumber;
        apiService.getUserDetail(socket.id).then(function (result) {
            var _a;
            var numbers = [Number(selectedNumber), Number(number)];
            var sumValues = function (num) {
                return num.reduce(function (a, b) {
                    return a + b;
                });
            };
            var calculationResult = function (number, numberB) {
                var res = sumValues(number);
                if (res % 3 == 0) {
                    return res / 3;
                }
                else {
                    return numberB;
                }
            };
            var lastResult = calculationResult(numbers, number);
            // When the second oponnent is a CPU
            if (((_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.roomType) === "cpu") {
                // After clients selection it will wait 2 seconds for the CPU selection
                setTimeout(function () {
                    var setOfRandomNumbers = [1, 0, -1];
                    var randomCPU = setOfRandomNumbers[Math.floor(Math.random() * setOfRandomNumbers.length)];
                    var combinedNumbers = [randomCPU, lastResult];
                    var CPUResult = calculationResult(combinedNumbers, lastResult);
                    io.to(result === null || result === void 0 ? void 0 : result.data.room).emit("randomNumber", {
                        number: calculationResult(combinedNumbers, lastResult),
                        isFirst: false,
                        user: "CPU",
                        selectedNumber: randomCPU,
                        isCorrectResult: CPUResult == lastResult ? false : true,
                    });
                    io.to(result === null || result === void 0 ? void 0 : result.data.room).emit("activateYourTurn", {
                        user: socket.id,
                        state: GameState.PLAY,
                    });
                    if (calculationResult(combinedNumbers, lastResult) === 1) {
                        io.to(result === null || result === void 0 ? void 0 : result.data.room).emit("gameOver", {
                            user: "CPU",
                            isOver: true,
                        });
                    }
                }, 2000);
            }
            io.to(result === null || result === void 0 ? void 0 : result.data.room).emit("randomNumber", {
                number: calculationResult(numbers, number),
                isFirst: false,
                user: result === null || result === void 0 ? void 0 : result.data.name,
                selectedNumber: selectedNumber,
                isCorrectResult: calculationResult(numbers, number) == number ? false : true,
            });
            io.to(result === null || result === void 0 ? void 0 : result.data.room).emit("activateYourTurn", {
                user: socket.id,
                state: GameState.WAIT,
            });
            /* if 1 is reached than emit the GameOver Listener */
            if (calculationResult(numbers, number) == 1) {
                io.to(result === null || result === void 0 ? void 0 : result.data.room).emit("gameOver", {
                    user: result === null || result === void 0 ? void 0 : result.data.name,
                    isOver: true,
                });
            }
        });
    });
    /* Clear all data and states when the user leave the room */
    socket.on("leaveRoom", function () {
        apiService.getUserDetail(socket.id).then(function (result) {
            if (!(result === null || result === void 0 ? void 0 : result.data.room))
                throw new Error("User not found");
            io.to(result === null || result === void 0 ? void 0 : result.data.room).emit("onReady", { state: false });
            apiService.removeUserFromRoom(socket.id).then(function () {
                socket.leave(result === null || result === void 0 ? void 0 : result.data.room);
            });
        }).catch(function (err) {
            socket.emit("error", { message: err });
            socket.emit("onReady", { state: false });
        });
    });
    /* OnDisconnet clear all login and room data from the connected socket */
    socket.on("disconnect", function () {
        apiService.getUserDetail(socket.id).then(function (result) {
            socket.broadcast.to(result === null || result === void 0 ? void 0 : result.data.room).emit("onReady", { state: false });
            apiService.removeUserFromRoom(socket.id).then(function () {
                socket.leave(result === null || result === void 0 ? void 0 : result.data.room);
            });
        });
        // Clear selected user from FakeDb and broadcast the event to the subscribers
        apiService.clearUser(socket.id).then(function () {
            socket.broadcast.emit("listTrigger", "" + true);
        });
    });
});
console.log("Socket Connection Established on " + process.env.HOST_LOCAL + " in port " + process.env.SOCKET_PORT);
io.listen(port, {
    path: "/",
});
