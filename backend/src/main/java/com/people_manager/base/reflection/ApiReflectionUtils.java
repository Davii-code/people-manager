package com.people_manager.base.reflection;

import com.people_manager.base.annotation.MandatoryField;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

public class ApiReflectionUtils {

    public static void validateMandatoryFields(Object object, List<String> namesOfInvalidFields) {
        var mandatoryFields = getFieldsWithAnnotation(object, MandatoryField.class);

        for (Field field : mandatoryFields) {
            var valueField = getFieldValue(object, field);
            boolean isValid = true;

            if (valueField == null) {
                isValid = false;
            }
            else if (valueField instanceof String) {
                if (((String) valueField).trim().isEmpty() || ((String) valueField).trim().length() > field.getAnnotation(MandatoryField.class).length()) {
                    isValid = false;
                }
            }
            else if (valueField instanceof byte[]) {
                isValid = ((byte[]) valueField).length > 0;
            }
            else if (valueField instanceof Collection<?>) {
                isValid = !((Collection<?>) valueField).isEmpty();
            }
            else if (!field.getType().isPrimitive() && !field.getType().getName().startsWith("java.lang") && !field.getType().getName().startsWith("java.time") && !field.getType().isEnum()) {
                validateMandatoryFields(valueField, namesOfInvalidFields);
            }

            if (!isValid) {
                namesOfInvalidFields.add(getNameMandatoryField(field));
            }
        }
    }

    public static String getNameMandatoryField(Field field) {
        var nameOfAnnotation = field.getAnnotation(MandatoryField.class).name();
        if (nameOfAnnotation != null && !nameOfAnnotation.isBlank()) {
            return field.getAnnotation(MandatoryField.class).name();
        } else {
            return field.getName();
        }
    }

    public static Object getFieldValue(Object object, Field field) {
        try {
            var objectClass = object.getClass();
            var methodGetFieldName = "get" + uCFirst(field.getName());
            return objectClass.getMethod(methodGetFieldName).invoke(object);
        } catch (IllegalAccessException | InvocationTargetException | NoSuchMethodException ex) {
            throw new RuntimeException(ex);
        }
    }

    public static List<Field> getFieldsWithAnnotation(Object object, Class annotationClass) {
        var mandatoryFields = new ArrayList<Field>();

        var fields = getFields(object);
        for (Field field : fields) {
            if (field.isAnnotationPresent(annotationClass)) {
                mandatoryFields.add(field);
            }
        }

        return mandatoryFields;
    }

    public static List<Field> getFields(Object object){
        var resultFields = new ArrayList<Field>();
        var clazz = object.getClass();
        while(clazz != null && !clazz.equals(Object.class)){
            var modelFields = clazz.getDeclaredFields();
            resultFields.addAll(Arrays.asList(modelFields));
            clazz = clazz.getSuperclass();
        }
        return resultFields;
    }

    public static String uCFirst(String str){
        return str.substring(0,1).toUpperCase() + str.substring(1);
    }

}
