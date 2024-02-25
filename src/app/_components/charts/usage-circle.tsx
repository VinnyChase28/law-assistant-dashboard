import { Card, Flex, Text, ProgressCircle } from "@tremor/react";

export const UsageCircle = () => (
  <Card>
    <Flex flexDirection="col" alignItems="center" justifyContent="center">
      {/* Use a larger size for the circle and center it */}
      <ProgressCircle
        value={(43 / 50) * 100}
        size="xl"
        className="my-4 pt-11"
      />
      {/* Heading and text centered below the circle */}
      <h3 className="text-xl font-medium text-gray-700">
        $43/$50 ({(43 / 50) * 100}%)
      </h3>
      <Text>API Usage</Text>
    </Flex>
  </Card>
);

export default UsageCircle;
