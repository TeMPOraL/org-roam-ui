import {
  CloseIcon,
  RepeatClockIcon,
  ChevronDownIcon,
  SettingsIcon,
  InfoOutlineIcon,
  RepeatIcon,
  ArrowRightIcon,
} from '@chakra-ui/icons'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  Select,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  StackDivider,
  Switch,
  Text,
  Tooltip,
  VStack,
  Heading,
  Collapse,
  Grid,
  Portal,
} from '@chakra-ui/react'
import React, { useState, useContext } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { initialPhysics, initialFilter, initialVisuals, initialMouse } from './config'

import { ThemeContext } from '../pages/themecontext'

export interface TweakProps {
  physics: typeof initialPhysics
  setPhysics: any
  threeDim: boolean
  setThreeDim: (newValue: boolean) => void
  filter: typeof initialFilter
  setFilter: any
  visuals: typeof initialVisuals
  setVisuals: any
  mouse: typeof initialMouse
  setMouse: any
}

export const Tweaks = (props: TweakProps) => {
  const {
    physics,
    setPhysics,
    threeDim,
    setThreeDim,
    filter,
    setFilter,
    visuals,
    setVisuals,
    mouse,
    setMouse,
  } = props
  const [showTweaks, setShowTweaks] = useState(true)
  const { highlightColor, setHighlightColor } = useContext(ThemeContext)
  const colorList = [
    'red.500',
    'orange.500',
    'yellow.500',
    'green.500',
    'cyan.500',
    'blue.500',
    'pink.500',
    'purple.500',
    'gray.400',
    'gray.500',
    'gray.600',
    'white',
    'black',
  ]
  const grays = [
    'black',
    'gray.100',
    'gray.200',
    'gray.300',
    'gray.400',
    'gray.500',
    'gray.600',
    'gray.700',
    'gray.800',
    'gray.900',
    'white',
  ]
  return (
    <>
      <Box
        position="relative"
        zIndex="overlay"
        marginTop={10}
        marginLeft={10}
        display={showTweaks ? 'none' : 'block'}
      >
        <IconButton
          aria-label="Settings"
          icon={<SettingsIcon />}
          onClick={() => setShowTweaks(true)}
        />
      </Box>
      <Collapse in={showTweaks} animateOpacity>
        <Box
          bg="alt.100"
          w="xs"
          marginTop={10}
          marginLeft={10}
          borderRadius="xl"
          maxH={650}
          paddingBottom={5}
          zIndex={300}
          position="relative"
          boxShadow="xl"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            paddingRight={2}
            paddingTop={1}
          >
            <Tooltip label={'Switch to ' + threeDim ? '2D' : '3D' + ' view'}>
              <Button onClick={() => setThreeDim(!threeDim)} variant="ghost" zIndex="overlay">
                {threeDim ? '3D' : '2D'}
              </Button>
            </Tooltip>
            <Box display="flex" alignItems="center">
              <Tooltip label="Reset settings to defaults">
                <IconButton
                  aria-label="Reset Defaults"
                  icon={<RepeatClockIcon />}
                  onClick={() => {
                    setVisuals(initialVisuals)
                    setFilter(initialFilter)
                    setMouse(initialMouse)
                    setPhysics(initialPhysics)
                  }}
                  variant="none"
                  size="sm"
                />
              </Tooltip>
              <IconButton
                size="sm"
                icon={<CloseIcon />}
                aria-label="Close Tweak Panel"
                variant="ghost"
                onClick={() => setShowTweaks(false)}
              />
            </Box>
          </Box>
          <Scrollbars
            autoHeight
            autoHeightMax={600}
            autoHide
            renderThumbVertical={({ style, ...props }) => (
              <Box
                {...props}
                style={{
                  ...style,
                  borderRadius: 10,
                }}
                bg={highlightColor}
              />
            )}
          >
            <Accordion allowMultiple allowToggle color="black">
              <AccordionItem>
                <AccordionButton>
                  <AccordionIcon marginRight={2} />
                  <Heading size="sm">Filter</Heading>
                </AccordionButton>
                <AccordionPanel>
                  <VStack
                    spacing={2}
                    justifyContent="flex-start"
                    divider={<StackDivider borderColor="gray.500" />}
                    align="stretch"
                    paddingLeft={7}
                    color="gray.800"
                  >
                    <Flex justifyContent="space-between">
                      <Text>Orphans</Text>
                      <Switch
                        onChange={() => {
                          setFilter({ ...filter, orphans: !filter.orphans })
                        }}
                        isChecked={filter.orphans}
                      ></Switch>
                    </Flex>
                    <Flex justifyContent="space-between">
                      <Text>Link nodes with parent file</Text>
                      <Switch
                        onChange={() => {
                          setFilter({ ...filter, parents: !filter.parents })
                        }}
                        isChecked={filter.parents}
                      ></Switch>
                    </Flex>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton display="flex" justifyContent="space-between">
                  <Box display="flex">
                    <AccordionIcon marginRight={2} />
                    <Heading size="sm">Physics</Heading>
                  </Box>
                  {/* <Switch
                      id="physicsOn"
                      onChange={() => setPhysics({ ...physics, enabled: !physics.enabled })}
                      isChecked={physics.enabled}
                      /> */}
                </AccordionButton>
                <AccordionPanel>
                  <VStack
                    spacing={2}
                    justifyContent="flex-start"
                    divider={<StackDivider borderColor="gray.500" />}
                    align="stretch"
                    paddingLeft={7}
                    color="gray.800"
                  >
                    <EnableSection
                      label="Gravity"
                      value={physics.gravityOn}
                      onChange={() => setPhysics({ ...physics, gravityOn: !physics.gravityOn })}
                    >
                      <SliderWithInfo
                        label="Strength"
                        value={physics.gravity * 10}
                        onChange={(v) => setPhysics({ ...physics, gravity: v / 10 })}
                      />
                    </EnableSection>
                    <SliderWithInfo
                      value={-physics.charge / 100}
                      onChange={(value) => setPhysics({ ...physics, charge: -100 * value })}
                      label="Repulsive Force"
                    />
                    <EnableSection
                      label="Collision"
                      infoText="Perfomance sap, disable if slow"
                      value={physics.collision}
                      onChange={() => setPhysics({ ...physics, collision: !physics.collision })}
                    >
                      <SliderWithInfo
                        value={physics.collisionStrength / 5}
                        onChange={(value) =>
                          setPhysics({ ...physics, collisionStrength: value * 5 })
                        }
                        label="Collision Radius"
                        infoText="Easy with this one, high values can lead to a real jiggly mess"
                      />
                    </EnableSection>
                    <SliderWithInfo
                      value={physics.linkStrength * 5}
                      onChange={(value) => setPhysics({ ...physics, linkStrength: value / 5 })}
                      label="Link Force"
                    />
                    <SliderWithInfo
                      label="Link Iterations"
                      value={physics.linkIts}
                      onChange={(value) => setPhysics({ ...physics, linkIts: value })}
                      min={0}
                      max={6}
                      step={1}
                      infoText="How many links down the line the physics of a single node affects (Slow)"
                    />
                    <SliderWithInfo
                      label="Viscosity"
                      value={physics.velocityDecay * 10}
                      onChange={(value) => setPhysics({ ...physics, velocityDecay: value / 10 })}
                    />
                  </VStack>
                  <Box>
                    <Accordion paddingLeft={3} allowToggle>
                      <AccordionItem>
                        <AccordionButton>
                          <Text>Advanced</Text>
                          <AccordionIcon marginRight={2} />
                        </AccordionButton>
                        <AccordionPanel>
                          <VStack
                            spacing={2}
                            justifyContent="flex-start"
                            divider={<StackDivider borderColor="gray.500" />}
                            align="stretch"
                            paddingLeft={3}
                            color="gray.800"
                          >
                            <SliderWithInfo
                              label="Stabilization rate"
                              value={physics.alphaDecay * 50}
                              onChange={(value) =>
                                setPhysics({ ...physics, alphaDecay: value / 50 })
                              }
                            />
                            <EnableSection
                              label="Center nodes"
                              value={physics.centering}
                              onChange={() =>
                                setPhysics({ ...physics, centering: !physics.centering })
                              }
                              infoText="Keeps the nodes in the center of the viewport. If disabled you can drag the nodes anywhere you want."
                            >
                              <SliderWithInfo
                                label="Centering Strength"
                                value={physics.centeringStrength}
                                max={2}
                                step={0.01}
                                onChange={(v) => setPhysics({ ...physics, centeringStrength: v })}
                              />
                            </EnableSection>
                          </VStack>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton>
                  <AccordionIcon marginRight={2} />
                  <Heading size="sm">Visual</Heading>
                </AccordionButton>
                <AccordionPanel>
                  <VStack justifyContent="flex-start" align="stretch">
                    <Accordion allowToggle defaultIndex={[0]} paddingLeft={3}>
                      <AccordionItem>
                        <AccordionButton>
                          <Flex justifyContent="space-between" w="100%">
                            <Text>Colors</Text>
                            <AccordionIcon marginRight={2} />
                          </Flex>
                        </AccordionButton>
                        <AccordionPanel>
                          <VStack
                            spacing={2}
                            justifyContent="flex-start"
                            divider={<StackDivider borderColor="gray.500" />}
                            align="stretch"
                            color="gray.800"
                          >
                            <Box>
                              <Flex alignItems="center" justifyContent="space-between">
                                <Text>Nodes</Text>
                                <Tooltip label="Shuffle node colors">
                                  <IconButton
                                    aria-label="Shuffle node colors"
                                    size="sm"
                                    icon={<RepeatIcon />}
                                    variant="ghost"
                                    onClick={() => {
                                      const arr = visuals.nodeColorScheme ?? []
                                      setVisuals({
                                        ...visuals,
                                        //shuffle that guy
                                        //definitely thought of this myself
                                        nodeColorScheme: arr
                                          .map((x: any) => [Math.random(), x])
                                          .sort(([a], [b]) => a - b)
                                          .map(([_, x]) => x),
                                      })
                                    }}
                                  />
                                </Tooltip>
                                <Tooltip label="Cycle node colors">
                                  <IconButton
                                    aria-label="Shift node colors"
                                    icon={<ArrowRightIcon />}
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => {
                                      const arr = visuals.nodeColorScheme ?? []
                                      setVisuals({
                                        ...visuals,
                                        nodeColorScheme: [...arr.slice(1, arr.length), arr[0]],
                                      })
                                    }}
                                  />
                                </Tooltip>
                                <Menu placement="right" closeOnSelect={false} matchWidth>
                                  <MenuButton
                                    width={20}
                                    as={Button}
                                    colorScheme=""
                                    color="black"
                                    rightIcon={<ChevronDownIcon />}
                                  >
                                    <Flex
                                      height={6}
                                      width={6}
                                      flexDirection="column"
                                      flexWrap="wrap"
                                    >
                                      {visuals.nodeColorScheme.map((color) => (
                                        <Box
                                          key={color}
                                          bgColor={color}
                                          flex="1 1 8px"
                                          borderRadius="2xl"
                                        ></Box>
                                      ))}
                                    </Flex>
                                  </MenuButton>
                                  <Portal>
                                    {' '}
                                    <MenuList minW={10} zIndex="popover" bgColor="gray.200">
                                      <MenuOptionGroup
                                        width={500}
                                        type="checkbox"
                                        defaultValue={visuals.nodeColorScheme}
                                        onChange={(colors) => {
                                          if (!colors.length) {
                                            return
                                          }
                                          setVisuals({ ...visuals, nodeColorScheme: colors })
                                        }}
                                      >
                                        {colorList.map((color) => (
                                          <MenuItemOption
                                            key={color}
                                            isChecked={visuals.nodeColorScheme.some(
                                              (c) => c === color,
                                            )}
                                            value={color}
                                            isDisabled={
                                              visuals.nodeColorScheme.length === 1 &&
                                              visuals.nodeColorScheme[0] === color
                                            }
                                          >
                                            <Box
                                              justifyContent="space-between"
                                              alignItems="center"
                                              display="flex"
                                            >
                                              <Box
                                                bgColor={color}
                                                borderRadius="sm"
                                                height={6}
                                                width={6}
                                              ></Box>
                                            </Box>
                                          </MenuItemOption>
                                        ))}
                                      </MenuOptionGroup>
                                    </MenuList>
                                  </Portal>
                                </Menu>
                              </Flex>
                              <Flex alignItems="center" justifyContent="space-between">
                                <Text>Links</Text>
                                <Menu placement="right">
                                  <MenuButton
                                    as={Button}
                                    colorScheme=""
                                    color="black"
                                    rightIcon={<ChevronDownIcon />}
                                  >
                                    <Box>
                                      {visuals.linkColorScheme ? (
                                        <Box
                                          bgColor={visuals.linkColorScheme}
                                          borderRadius="sm"
                                          height={6}
                                          width={6}
                                        ></Box>
                                      ) : (
                                        <Flex
                                          height={6}
                                          width={6}
                                          flexDirection="column"
                                          flexWrap="wrap"
                                        >
                                          {visuals.nodeColorScheme.map((color) => (
                                            <Box
                                              key={color}
                                              bgColor={color}
                                              flex="1 1 8px"
                                              borderRadius="2xl"
                                            ></Box>
                                          ))}
                                        </Flex>
                                      )}
                                    </Box>
                                  </MenuButton>
                                  <Portal>
                                    {' '}
                                    <MenuList minW={10} zIndex="popover" bgColor="gray.200">
                                      <MenuItem
                                        onClick={() =>
                                          setVisuals({ ...visuals, linkColorScheme: '' })
                                        }
                                        justifyContent="space-between"
                                        alignItems="center"
                                        display="flex"
                                      >
                                        <Flex
                                          height={6}
                                          width={6}
                                          flexDirection="column"
                                          flexWrap="wrap"
                                        >
                                          {visuals.nodeColorScheme.map((color) => (
                                            <Box
                                              key={color}
                                              bgColor={color}
                                              flex="1 1 8px"
                                              borderRadius="2xl"
                                            ></Box>
                                          ))}
                                        </Flex>
                                      </MenuItem>
                                      {grays.map((color) => (
                                        <MenuItem
                                          key={color}
                                          onClick={() =>
                                            setVisuals({
                                              ...visuals,
                                              linkColorScheme: color,
                                            })
                                          }
                                          justifyContent="space-between"
                                          alignItems="center"
                                          display="flex"
                                        >
                                          <Box
                                            bgColor={color}
                                            borderRadius="sm"
                                            height={6}
                                            width={6}
                                          ></Box>
                                        </MenuItem>
                                      ))}
                                    </MenuList>
                                  </Portal>
                                </Menu>
                              </Flex>
                              <Flex alignItems="center" justifyContent="space-between">
                                <Text>Accent</Text>
                                <Menu placement="right">
                                  <MenuButton
                                    as={Button}
                                    colorScheme=""
                                    color="black"
                                    rightIcon={<ChevronDownIcon />}
                                  >
                                    {
                                      <Box
                                        bgColor={highlightColor}
                                        borderRadius="sm"
                                        height={6}
                                        width={6}
                                      ></Box>
                                    }
                                  </MenuButton>
                                  <Portal>
                                    {' '}
                                    <MenuList minW={10} zIndex="popover" bgColor="gray.200">
                                      {colorList.map((color) => (
                                        <MenuItem
                                          key={color}
                                          onClick={() => setHighlightColor(color)}
                                          justifyContent="space-between"
                                          alignItems="center"
                                          display="flex"
                                        >
                                          <Box
                                            bgColor={color}
                                            borderRadius="sm"
                                            height={6}
                                            width={6}
                                          ></Box>
                                        </MenuItem>
                                      ))}
                                    </MenuList>
                                  </Portal>
                                </Menu>
                              </Flex>
                              <Flex alignItems="center" justifyContent="space-between">
                                <Text>Link Highlight</Text>
                                <Menu placement="right">
                                  <MenuButton
                                    as={Button}
                                    colorScheme=""
                                    color="black"
                                    rightIcon={<ChevronDownIcon />}
                                  >
                                    {
                                      <Box
                                        bgColor={visuals.linkHighlight}
                                        borderRadius="sm"
                                        height={6}
                                        width={6}
                                      ></Box>
                                    }
                                  </MenuButton>
                                  <Portal>
                                    {' '}
                                    <MenuList minW={10} zIndex="popover" bgColor="gray.200">
                                      <MenuItem
                                        key={'none'}
                                        onClick={() =>
                                          setVisuals({ ...visuals, linkHighlight: '' })
                                        }
                                        justifyContent="space-between"
                                        alignItems="center"
                                        display="flex"
                                      >
                                        <Box borderRadius="sm" height={6} width={6}></Box>
                                      </MenuItem>
                                      {colorList.map((color) => (
                                        <MenuItem
                                          key={color}
                                          onClick={() =>
                                            setVisuals({ ...visuals, linkHighlight: color })
                                          }
                                          justifyContent="space-between"
                                          alignItems="center"
                                          display="flex"
                                        >
                                          <Box
                                            bgColor={color}
                                            borderRadius="sm"
                                            height={6}
                                            width={6}
                                          ></Box>
                                        </MenuItem>
                                      ))}
                                    </MenuList>
                                  </Portal>
                                </Menu>
                              </Flex>
                              <Flex alignItems="center" justifyContent="space-between">
                                <Text>Node Highlight</Text>
                                <Menu placement="right">
                                  <MenuButton
                                    as={Button}
                                    colorScheme=""
                                    color="black"
                                    rightIcon={<ChevronDownIcon />}
                                  >
                                    {
                                      <Box
                                        bgColor={visuals.nodeHighlight}
                                        borderRadius="sm"
                                        height={6}
                                        width={6}
                                      ></Box>
                                    }
                                  </MenuButton>
                                  <Portal>
                                    {' '}
                                    <MenuList minW={10} zIndex="popover" bgColor="gray.200">
                                      <MenuItem
                                        key={'none'}
                                        onClick={() =>
                                          setVisuals({ ...visuals, nodeHighlight: '' })
                                        }
                                        justifyContent="space-between"
                                        alignItems="center"
                                        display="flex"
                                      >
                                        <Box borderRadius="sm" height={6} width={6}></Box>
                                      </MenuItem>
                                      {colorList.map((color) => (
                                        <MenuItem
                                          key={color}
                                          onClick={() =>
                                            setVisuals({ ...visuals, nodeHighlight: color })
                                          }
                                          justifyContent="space-between"
                                          alignItems="center"
                                          display="flex"
                                        >
                                          <Box
                                            bgColor={color}
                                            borderRadius="sm"
                                            height={6}
                                            width={6}
                                          ></Box>
                                        </MenuItem>
                                      ))}
                                    </MenuList>
                                  </Portal>
                                </Menu>
                              </Flex>
                              <Flex alignItems="center" justifyContent="space-between">
                                <Text>Background</Text>
                                <Menu placement="right">
                                  <MenuButton
                                    as={Button}
                                    colorScheme=""
                                    color="black"
                                    rightIcon={<ChevronDownIcon />}
                                  >
                                    {
                                      <Box
                                        bgColor={visuals.backgroundColor}
                                        borderRadius="sm"
                                        height={6}
                                        width={6}
                                      ></Box>
                                    }
                                  </MenuButton>
                                  <Portal>
                                    {' '}
                                    <MenuList minWidth={10} zIndex="popover" bgColor="gray.200">
                                      {grays.map((color) => (
                                        <MenuItem
                                          key={color}
                                          onClick={() =>
                                            setVisuals({ ...visuals, backgroundColor: color })
                                          }
                                          justifyContent="space-between"
                                          alignItems="center"
                                          display="flex"
                                        >
                                          <Box
                                            bgColor={color}
                                            borderRadius="sm"
                                            height={6}
                                            width={6}
                                          ></Box>
                                        </MenuItem>
                                      ))}
                                    </MenuList>
                                  </Portal>
                                </Menu>
                              </Flex>
                              <Flex alignItems="center" justifyContent="space-between">
                                <Text>Emacs Node</Text>
                                <Menu placement="right">
                                  <MenuButton
                                    as={Button}
                                    colorScheme=""
                                    color="black"
                                    rightIcon={<ChevronDownIcon />}
                                  >
                                    {
                                      <Box
                                        bgColor={visuals.emacsNodeColor}
                                        borderRadius="sm"
                                        height={6}
                                        width={6}
                                      ></Box>
                                    }
                                  </MenuButton>
                                  <Portal>
                                    {' '}
                                    <MenuList minWidth={10} zIndex="popover" bgColor="gray.200">
                                      <MenuItem
                                        key={'none'}
                                        onClick={() =>
                                          setVisuals({ ...visuals, emacsNodeColor: '' })
                                        }
                                        justifyContent="space-between"
                                        alignItems="center"
                                        display="flex"
                                      >
                                        <Box borderRadius="sm" height={6} width={6}></Box>
                                      </MenuItem>
                                      {colorList.map((color) => (
                                        <MenuItem
                                          key={color}
                                          onClick={() =>
                                            setVisuals({ ...visuals, emacsNodeColor: color })
                                          }
                                          justifyContent="space-between"
                                          alignItems="center"
                                          display="flex"
                                        >
                                          <Box
                                            bgColor={color}
                                            borderRadius="sm"
                                            height={6}
                                            width={6}
                                          ></Box>
                                        </MenuItem>
                                      ))}
                                    </MenuList>
                                  </Portal>
                                </Menu>
                              </Flex>
                            </Box>
                          </VStack>
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>
                    <VStack
                      spacing={2}
                      justifyContent="flex-start"
                      divider={<StackDivider borderColor="gray.500" />}
                      align="stretch"
                      paddingLeft={7}
                      color="gray.800"
                    >
                      <SliderWithInfo
                        label="Node size"
                        value={visuals.nodeRel}
                        onChange={(value) => setVisuals({ ...visuals, nodeRel: value })}
                      />
                      {threeDim && (
                        <>
                          <SliderWithInfo
                            label="Node opacity"
                            value={visuals.nodeOpacity}
                            min={0}
                            max={1}
                            onChange={(value) => setVisuals({ ...visuals, nodeOpacity: value })}
                          />
                          <SliderWithInfo
                            label="Node resolution"
                            value={visuals.nodeResolution}
                            min={5}
                            max={32}
                            step={1}
                            onChange={(value) => setVisuals({ ...visuals, nodeResolution: value })}
                          />
                        </>
                      )}
                      <SliderWithInfo
                        label="Link width"
                        value={visuals.linkWidth}
                        onChange={(value) => setVisuals({ ...visuals, linkWidth: value })}
                      />
                      {threeDim && (
                        <SliderWithInfo
                          label="Link opacity"
                          min={0}
                          max={1}
                          value={visuals.linkOpacity}
                          onChange={(value) => setVisuals({ ...visuals, linkOpacity: value })}
                        />
                      )}
                      <Box>
                        <Flex alignItems="center" justifyContent="space-between">
                          <Text>Labels</Text>
                          <Menu placement="right">
                            <MenuButton
                              as={Button}
                              colorScheme=""
                              color="black"
                              rightIcon={<ChevronDownIcon />}
                            >
                              {!visuals.labels
                                ? 'Never'
                                : visuals.labels < 2
                                ? 'On Highlight'
                                : 'Always'}
                            </MenuButton>
                            <Portal>
                              {' '}
                              <MenuList zIndex="popover" bgColor="gray.200">
                                <MenuItem onClick={() => setVisuals({ ...visuals, labels: 0 })}>
                                  Never
                                </MenuItem>
                                <MenuItem onClick={() => setVisuals({ ...visuals, labels: 1 })}>
                                  On Highlight
                                </MenuItem>
                                <MenuItem onClick={() => setVisuals({ ...visuals, labels: 2 })}>
                                  Always
                                </MenuItem>
                                <MenuItem onClick={() => setVisuals({ ...visuals, labels: 3 })}>
                                  Always (even in 3D)
                                </MenuItem>
                              </MenuList>
                            </Portal>
                          </Menu>
                        </Flex>
                        <Collapse in={visuals.labels > 0} animateOpacity>
                          <VStack
                            spacing={1}
                            justifyContent="flex-start"
                            divider={<StackDivider borderColor="gray.400" />}
                            align="stretch"
                            paddingLeft={2}
                            color="gray.800"
                          >
                            <Flex alignItems="center" justifyContent="space-between">
                              <Text>Text</Text>
                              <Menu matchWidth>
                                <MenuButton
                                  as={Button}
                                  rightIcon={<ChevronDownIcon />}
                                  color="black"
                                  colorScheme=""
                                >
                                  {
                                    <Box
                                      bgColor={visuals.labelTextColor}
                                      borderRadius="sm"
                                      height={6}
                                      width={6}
                                    ></Box>
                                  }
                                </MenuButton>
                                <Portal>
                                  {' '}
                                  <MenuList minW={10} zIndex="popover" bg="gray.200">
                                    {grays.map((color) => (
                                      <MenuItem
                                        key={color}
                                        onClick={() =>
                                          setVisuals({
                                            ...visuals,
                                            labelTextColor: color,
                                          })
                                        }
                                      >
                                        <Box
                                          bgColor={color}
                                          borderRadius="sm"
                                          height={6}
                                          width={6}
                                        ></Box>
                                      </MenuItem>
                                    ))}
                                  </MenuList>
                                </Portal>
                              </Menu>
                            </Flex>
                            <Flex alignItems="center" justifyContent="space-between">
                              <Text>Background</Text>
                              <Menu placement="right">
                                <MenuButton
                                  as={Button}
                                  rightIcon={<ChevronDownIcon />}
                                  color="black"
                                  colorScheme=""
                                >
                                  {
                                    <Box
                                      bgColor={visuals.labelBackgroundColor}
                                      borderRadius="sm"
                                      height={6}
                                      width={6}
                                    ></Box>
                                  }
                                </MenuButton>
                                <Portal>
                                  {' '}
                                  <MenuList minW={10} zIndex="popover" bg="gray.200">
                                    <MenuItem
                                      onClick={() =>
                                        setVisuals({
                                          ...visuals,
                                          labelBackgroundColor: '',
                                        })
                                      }
                                      justifyContent="space-between"
                                      alignItems="center"
                                      display="flex"
                                    >
                                      None
                                    </MenuItem>
                                    {grays.map((color) => (
                                      <MenuItem
                                        key={color}
                                        onClick={() =>
                                          setVisuals({
                                            ...visuals,
                                            labelBackgroundColor: color,
                                          })
                                        }
                                        justifyContent="space-between"
                                        alignItems="center"
                                        display="flex"
                                      >
                                        <Box
                                          bgColor={color}
                                          borderRadius="sm"
                                          height={6}
                                          width={6}
                                        ></Box>
                                      </MenuItem>
                                    ))}
                                  </MenuList>
                                </Portal>
                              </Menu>
                            </Flex>
                            <Collapse in={!!visuals.labelBackgroundColor} animateOpacity>
                              <Box paddingTop={2}>
                                <SliderWithInfo
                                  label="Background opacity"
                                  value={visuals.labelBackgroundOpacity}
                                  onChange={(value) => {
                                    console.log(visuals.labelBackgroundOpacity)
                                    setVisuals({ ...visuals, labelBackgroundOpacity: value })
                                  }}
                                  min={0}
                                  max={1}
                                  step={0.01}
                                />
                              </Box>
                            </Collapse>
                            <Collapse in={visuals.labels > 1} animateOpacity>
                              <Box paddingTop={2}>
                                <SliderWithInfo
                                  label="Label Appearance Scale"
                                  value={visuals.labelScale * 5}
                                  onChange={(value) =>
                                    setVisuals({ ...visuals, labelScale: value / 5 })
                                  }
                                />
                              </Box>
                            </Collapse>
                          </VStack>
                        </Collapse>
                      </Box>
                      <EnableSection
                        label="Directional Particles"
                        value={visuals.particles}
                        onChange={() => setVisuals({ ...visuals, particles: !visuals.particles })}
                      >
                        <SliderWithInfo
                          label="Particle Number"
                          value={visuals.particlesNumber}
                          max={5}
                          step={1}
                          onChange={(value) => setVisuals({ ...visuals, particlesNumber: value })}
                        />
                        <SliderWithInfo
                          label="Particle Size"
                          value={visuals.particlesWidth}
                          onChange={(value) => setVisuals({ ...visuals, particlesWidth: value })}
                        />
                      </EnableSection>
                      <EnableSection
                        label="Highlight"
                        onChange={() => setVisuals({ ...visuals, highlight: !visuals.highlight })}
                        value={visuals.highlight}
                      >
                        <VStack
                          spacing={1}
                          justifyContent="flex-start"
                          divider={<StackDivider borderColor="gray.400" />}
                          align="stretch"
                          paddingLeft={0}
                        >
                          <SliderWithInfo
                            label="Highlight Link Thickness"
                            value={visuals.highlightLinkSize}
                            onChange={(value) =>
                              setVisuals({ ...visuals, highlightLinkSize: value })
                            }
                          />
                          <SliderWithInfo
                            label="Highlight Node Size"
                            value={visuals.highlightNodeSize}
                            onChange={(value) =>
                              setVisuals({ ...visuals, highlightNodeSize: value })
                            }
                          />
                          {/*<Flex justifyContent="space-between">
                          <Text> Highlight node color </Text>
                        </Flex>
                        <Flex justifyContent="space-between">
                          <Text> Highlight link color </Text>
                            </Flex>*/}
                          <EnableSection
                            label="Highlight Animation"
                            onChange={() => {
                              setVisuals({ ...visuals, highlightAnim: !visuals.highlightAnim })
                            }}
                            value={visuals.highlightAnim}
                          >
                            <SliderWithInfo
                              label="Animation speed"
                              onChange={(v) => setVisuals({ ...visuals, animationSpeed: v })}
                              value={visuals.animationSpeed}
                              infoText="Slower speed has a chance of being buggy"
                              min={50}
                              max={1000}
                              step={10}
                            />
                            <Select
                              placeholder={visuals.algorithmName}
                              onChange={(v) => {
                                setVisuals({ ...visuals, algorithmName: v.target.value })
                              }}
                            >
                              {visuals.algorithmOptions.map((opt: string) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </Select>
                          </EnableSection>
                        </VStack>
                      </EnableSection>
                    </VStack>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton>
                  <AccordionIcon marginRight={2} />
                  <Heading size="sm">Behavior</Heading>
                </AccordionButton>
                <AccordionPanel>
                  <VStack
                    spacing={2}
                    justifyContent="flex-start"
                    divider={<StackDivider borderColor="gray.500" />}
                    align="stretch"
                    paddingLeft={7}
                    color="gray.800"
                  >
                    <Flex alignItems="center" justifyContent="space-between">
                      <Flex>
                        <Text>Expand Node</Text>
                        <InfoTooltip infoText="View only the node and its direct neighbors" />
                      </Flex>
                      <Menu placement="right">
                        <MenuButton
                          as={Button}
                          rightIcon={<ChevronDownIcon />}
                          colorScheme=""
                          color="black"
                        >
                          <Text>{mouse.local[0]!.toUpperCase() + mouse.local!.slice(1)}</Text>
                        </MenuButton>
                        <Portal>
                          {' '}
                          <MenuList zIndex="popover" bgColor="gray.200">
                            <MenuItem onClick={() => setMouse({ ...mouse, local: '' })}>
                              Never
                            </MenuItem>
                            <MenuItem onClick={() => setMouse({ ...mouse, local: 'click' })}>
                              Click
                            </MenuItem>
                            <MenuItem onClick={() => setMouse({ ...mouse, local: 'double' })}>
                              Double Click
                            </MenuItem>
                            <MenuItem onClick={() => setMouse({ ...mouse, local: 'right' })}>
                              Right Click
                            </MenuItem>
                          </MenuList>
                        </Portal>
                      </Menu>
                    </Flex>
                    <Flex alignItems="center" justifyContent="space-between">
                      <Text>Open in Emacs</Text>
                      <Menu placement="right">
                        <MenuButton
                          as={Button}
                          rightIcon={<ChevronDownIcon />}
                          colorScheme=""
                          color="black"
                        >
                          <Text>{mouse.follow[0]!.toUpperCase() + mouse.follow!.slice(1)}</Text>
                        </MenuButton>
                        <Portal>
                          {' '}
                          <MenuList bgColor="gray.200" zIndex="popover">
                            <MenuItem onClick={() => setMouse({ ...mouse, follow: '' })}>
                              Never
                            </MenuItem>
                            <MenuItem onClick={() => setMouse({ ...mouse, follow: 'click' })}>
                              Click
                            </MenuItem>
                            <MenuItem onClick={() => setMouse({ ...mouse, follow: 'double' })}>
                              Double Click
                            </MenuItem>
                            <MenuItem onClick={() => setMouse({ ...mouse, follow: 'right' })}>
                              Right Click
                            </MenuItem>
                          </MenuList>
                        </Portal>
                      </Menu>
                    </Flex>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Scrollbars>
        </Box>
      </Collapse>
    </>
  )
}

export interface InfoTooltipProps {
  infoText?: string | boolean
}
export const InfoTooltip = (props: InfoTooltipProps) => {
  const { infoText } = props
  return (
    <Box paddingLeft="1">
      <Tooltip label={infoText} placement="top" color="gray.100" bg="gray.800" hasArrow>
        <InfoOutlineIcon />
      </Tooltip>
    </Box>
  )
}
export interface SliderWithInfoProps {
  min?: number
  max?: number
  step?: number
  value: number
  onChange: (arg0: number) => void
  label: string
  infoText?: string
}
export const SliderWithInfo = ({
  min = 0,
  max = 10,
  step = 0.1,
  value = 1,
  ...rest
}: SliderWithInfoProps) => {
  const { onChange, label, infoText } = rest
  const { highlightColor } = useContext(ThemeContext)
  return (
    <Box>
      <Box display="flex" alignItems="flex-end">
        <Text>{label}</Text>
        {infoText && <InfoTooltip infoText={infoText} />}
      </Box>
      <Slider value={value} onChange={onChange} min={min} max={max} step={step}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <Tooltip bg={highlightColor} label={value.toFixed(1)}>
          <SliderThumb bg="white" />
        </Tooltip>
      </Slider>
    </Box>
  )
}

export interface EnableSectionProps {
  label: string
  value: boolean | number
  onChange: () => void
  infoText?: string
  children: React.ReactNode
}

export const EnableSection = (props: EnableSectionProps) => {
  const { value, onChange, label, infoText, children } = props
  return (
    <Box paddingTop={2}>
      <Box display="flex" justifyContent="space-between" paddingBottom={2}>
        <Box display="flex" alignItems="center">
          <Text>{label}</Text>
          {infoText && <InfoTooltip infoText={infoText} />}
        </Box>
        <Switch isChecked={!!value} onChange={onChange} />
      </Box>
      <Collapse in={!!value} animateOpacity>
        <Box paddingLeft={4} paddingTop={2} paddingBottom={2}>
          {children}
        </Box>
      </Collapse>
    </Box>
  )
}

export interface DropDownMenuProps {
  textArray: string[]
  onClickArray: (() => void)[]
  displayValue: string
}

export const DropDownMenu = (props: DropDownMenuProps) => {
  const { textArray, onClickArray, displayValue } = props
  return (
    <Menu placement="right">
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {displayValue}
      </MenuButton>
      <Portal>
        {' '}
        <MenuList zIndex="popover">
          {textArray.map((option, i) => {
            ;<MenuItem onClick={onClickArray[i]}> {option} </MenuItem>
          })}
        </MenuList>
      </Portal>
    </Menu>
  )
}
