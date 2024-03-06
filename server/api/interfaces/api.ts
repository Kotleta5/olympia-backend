/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/clients": {
    /** @description Returns a list of clients */
    get: operations["allClients"];
  };
  "/clients/{id}": {
    /** @description Returns a client by its id */
    get: {
      responses: {
        /** @description Successfully retrieved a client information */
        200: {
          content: {
            "application/json": components["schemas"]["ClientSchema"][];
          };
        };
        /** @description Internal server error */
        500: {
          content: never;
        };
      };
    };
  };
  "/modules": {
    /** @description Returns a list of clients */
    get: operations["allClients"];
  };
  "/header": {
    /** @description List properties for the header */
    get: operations["displayHeaderProperties"];
  };
  "/groups": {
    /** @description Get the groups out of a provided token */
    get: {
      responses: {
        /** @description Successfully retrieved the groups from the token */
        200: {
          content: {
            "application/json": components["schemas"]["GroupSchema"];
          };
        };
      };
    };
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    ClientSchema: {
      /** Format: int64 */
      client_id?: number;
      /**
       * @description Used as an alternative name for the client
       * @example AVA
       */
      client_ident?: string;
      /**
       * @description The name of the client, used as alt text when image can't be found
       * @example Avacon
       */
      client_name?: string;
      /**
       * @description The path where the client's logo is saved
       * @example /assets/avaLogo.png
       */
      client_logopath?: string;
      /**
       * @description A color of the brand defined for each client
       * @example #86BC25
       */
      client_color?: string;
    };
    ModuleSchema: {
      /** Format: int64 */
      module_id?: number;
      /**
       * @description Used as an alternative name for the module
       * @example FreewayApp
       */
      module_ident?: string;
      /**
       * @description The name of the module
       * @example Baustraßen-Tool
       */
      module_name?: string;
      /** @description The link where you can find the module */
      module_url?: string;
      /** @description Represents visibilty for other clients */
      module_visible?: boolean;
      /** @description Is module free to use without login */
      module_freelogin?: boolean;
      /**
       * Format: int64
       * @description The priority of the module
       */
      module_priority?: number;
      /** @description Shows whether the module is activated */
      module_activated?: number;
    };
    ClientModuleSchema: {
      client?: components["schemas"]["ClientSchema"];
      modules?: components["schemas"]["ModuleSchema"][];
    };
    HeaderPropertySchema: {
      /** Format: int64 */
      header_id?: number;
      /**
       * @description Ident of the header
       * @example EON
       */
      header_ident?: string;
      /**
       * @description The name of the user
       * @example Landingpage
       */
      header_user_name?: string;
      /** @description The path where the user's logo is saved */
      header_user_logopath?: string;
      /**
       * @description The title of the project
       * @example Landingpage
       */
      header_project_title?: string;
      /** @description The path where the project's logo is saved */
      header_project_logopath?: string;
    };
    GroupSchema: {
      /**
       * @description Groups assigned to the client
       * @example AVA
       */
      roles?: string[];
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  /** @description Returns a list of clients */
  allClients: {
    responses: {
      /** @description Successfully retrieved all client information */
      200: {
        content: {
          "application/json": components["schemas"]["ClientModuleSchema"][];
        };
      };
      /** @description Internal server error */
      500: {
        content: never;
      };
    };
  };
  /** @description List properties for the header */
  displayHeaderProperties: {
    responses: {
      /** @description Successfully retrieved all properties for the header */
      200: {
        content: {
          "application/json": components["schemas"]["HeaderPropertySchema"][];
        };
      };
      /** @description Internal server error */
      500: {
        content: never;
      };
    };
  };
}
