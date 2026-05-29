import React from "react"
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native"

export type Option = {
  id: string | number
  label: string
}

type ModalListProps = {
  title: string
  visible: boolean
  value?: Option | null
  options: Option[]
  openModal: () => void
  closeModal: () => void
  optionSelected: (option: Option) => void
}

export default function ModalSelect({
  title,
  visible,
  value,
  options,
  openModal,
  closeModal,
  optionSelected,
}: ModalListProps) {
  return (
    <>
      <View className="gap-2">
        <Text className="text-sm font-medium text-slate-700">{title}</Text>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={openModal}
          className="min-h-14 justify-center rounded-xl border border-slate-200 bg-slate-50 px-4"
        >
          <Text className={value ? "text-base text-slate-900" : "text-base text-slate-400"}>
            {value ? value.label : "Selecione uma opcao"}
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
      >
        <Pressable className="flex-1 bg-slate-950/60" onPress={closeModal}>
          <SafeAreaView className="flex-1 items-center justify-center px-6">
            <Pressable
              className="max-h-[70%] w-full rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl"
              onPress={(event) => event.stopPropagation()}
            >
              <Text className="mb-1 text-xs font-semibold uppercase tracking-[2px] text-red-500">
                Selecao
              </Text>
              <Text className="mb-5 text-2xl font-bold text-slate-900">
                {title}
              </Text>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="gap-3"
              >
                {options.map((option) => {
                  const isSelected = value?.id === option.id

                  return (
                    <TouchableOpacity
                      key={String(option.id)}
                      activeOpacity={0.85}
                      className={`rounded-2xl border px-4 py-4 ${
                        isSelected
                          ? "border-red-500 bg-red-50"
                          : "border-slate-200 bg-white"
                      }`}
                      onPress={() => {
                        optionSelected(option)
                        closeModal()
                      }}
                    >
                      <Text
                        className={
                          isSelected
                            ? "text-base font-semibold text-red-600"
                            : "text-base text-slate-800"
                        }
                      >
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  )
                })}
              </ScrollView>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={closeModal}
                className="mt-5 min-h-12 items-center justify-center rounded-xl bg-slate-900 px-4"
              >
                <Text className="font-medium text-white">Fechar</Text>
              </TouchableOpacity>
            </Pressable>
          </SafeAreaView>
        </Pressable>
      </Modal>
    </>
  )
}
