"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.POST = exports.GET = exports.authOptions = void 0;
const next_auth_1 = __importDefault(require("next-auth"));
const credentials_1 = __importDefault(require("next-auth/providers/credentials"));
const prisma_adapter_1 = require("@auth/prisma-adapter");
const db_1 = require("@/lib/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
exports.authOptions = {
    adapter: (0, prisma_adapter_1.PrismaAdapter)(db_1.prisma),
    providers: [
        (0, credentials_1.default)({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password)
                    return null;
                const user = await db_1.prisma.user.findUnique({
                    where: { email: credentials.email }
                });
                if (!user || !user.password)
                    return null;
                const isValid = await bcryptjs_1.default.compare(credentials.password, user.password);
                if (!isValid)
                    return null;
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name
                };
            }
        })
    ],
    session: { strategy: "jwt" },
    pages: { signIn: "/login" },
    callbacks: {
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.sub;
            }
            return session;
        }
    }
};
const handler = (0, next_auth_1.default)(exports.authOptions);
exports.GET = handler;
exports.POST = handler;
