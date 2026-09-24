import SwaggerUI from "./SwaggerUI";

import swaggerSpec from "../../swagger/swagger";

export default function ApiDocsPage() {
  return <SwaggerUI spec={swaggerSpec} />;
}
