#!/usr/bin/env node
import React from "react";

import { render } from "ink";
import meow from "meow";
import { App } from "./ui";

const cli = meow(
    `
`,
    {
        flags: {
            name: {
                type: "string"
            }
        }
    }
);

render(React.createElement(App, cli.flags));
